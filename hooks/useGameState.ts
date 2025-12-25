import { useState, useEffect, useCallback } from 'react';
import { GameState, GameSettings, Category, Language, Player, WordEntry, GameScreen } from '../types';
import { WORD_LIST, UI_STRINGS } from '../constants';

const detectBrowserLanguage = (): Language => {
  try {
    const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || 'en';
    const langCode = browserLang.split('-')[0].toLowerCase();
    
    if (langCode === 'sv') return Language.SV;
    if (langCode === 'fr') return Language.FR;
    if (langCode === 'zh') return Language.ZH;
    return Language.EN;
  } catch (e) {
    return Language.EN;
  }
};

const getLanguageFromPath = (): Language | null => {
  try {
    const path = window.location.pathname.split('/')[1]?.toLowerCase();
    if (path === 'sv') return Language.SV;
    if (path === 'fr') return Language.FR;
    if (path === 'zh' || path === 'zh-cn') return Language.ZH;
    if (path === 'en') return Language.EN;
    
    // Fallback to hash for backward compatibility
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash === 'sv') return Language.SV;
    if (hash === 'fr') return Language.FR;
    if (hash === 'zh' || hash === 'zh-cn') return Language.ZH;
    if (hash === 'en') return Language.EN;
    
    return null;
  } catch (e) {
    return null;
  }
};

const INITIAL_STATE: GameState = {
  screen: GameScreen.HOME,
  settings: {
    playerCount: 4,
    category: Category.ALL,
    showImposterHints: true,
    language: Language.EN
  },
  players: [],
  secretWord: '',
  imposterClue: '',
  imposterId: 0,
  startingPlayerId: 0,
  currentTurnIndex: 0,
  usedWords: {},
  playerNames: {},
  roundId: 0
};

export function useGameState() {
  const [state, setState] = useState<GameState>(INITIAL_STATE);

  // Load from local storage or URL hash on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('imposter_settings');
    const savedHistory = localStorage.getItem('imposter_history');
    const pathLang = getLanguageFromPath();
    
    let initialLang: Language | null = pathLang;
    
    if (!initialLang && savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        if (parsed.language) initialLang = parsed.language;
      } catch (e) {
        console.error('Failed to parse saved settings', e);
      }
    }
    
    if (!initialLang) {
      initialLang = detectBrowserLanguage();
    }
    
    setState(s => ({
      ...s,
      settings: { 
        ...s.settings, 
        ...(savedSettings ? JSON.parse(savedSettings) : {}),
        language: initialLang || s.settings.language 
      },
      usedWords: savedHistory ? JSON.parse(savedHistory) : {}
    }));

    // If we have a path lang, make sure it's in the URL
    if (initialLang) {
      const path = initialLang === Language.ZH ? 'zh' : (initialLang === Language.EN ? '' : initialLang);
      const expectedPath = path ? `/${path}` : '/';
      
      if (window.location.pathname !== expectedPath) {
        window.history.replaceState(null, '', expectedPath + window.location.search);
      }
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const newLang = getLanguageFromPath();
      if (newLang) {
        setState(s => {
          if (s.settings.language === newLang) return s;
          return {
            ...s,
            settings: { ...s.settings, language: newLang }
          };
        });
      } else {
        // Default to EN if path is cleared or unknown
        setState(s => {
          if (s.settings.language === Language.EN) return s;
          return {
            ...s,
            settings: { ...s.settings, language: Language.EN }
          };
        });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const saveToLocalStorage = useCallback((settings: GameSettings, history: Record<string, string[]>) => {
    localStorage.setItem('imposter_settings', JSON.stringify(settings));
    localStorage.setItem('imposter_history', JSON.stringify(history));
  }, []);

  const handleLanguageChange = useCallback((l: Language) => {
    // Update URL path for deep linking
    const path = l === Language.ZH ? 'zh' : (l === Language.EN ? '' : l);
    const newPath = path ? `/${path}` : '/';
    
    if (window.location.pathname !== newPath) {
      window.history.pushState(null, '', newPath + window.location.search);
    }

    setState(s => {
      const newSettings = { ...s.settings, language: l };
      saveToLocalStorage(newSettings, s.usedWords);
      return { ...s, settings: newSettings };
    });
  }, [saveToLocalStorage]);

  const initGame = useCallback((settings: GameSettings) => {
    setState(prev => {
      const lang = settings.language;
      const category = settings.category;
      
      let wordsInCategory: WordEntry[] = [];
      if (category === Category.ALL) {
        // Flatten all categories except ALL itself
        wordsInCategory = Object.entries(WORD_LIST[lang])
          .filter(([cat]) => cat !== Category.ALL)
          .flatMap(([, words]) => words);
      } else {
        wordsInCategory = WORD_LIST[lang][category] || [];
      }

      const categoryHistory = prev.usedWords[`${lang}_${category}`] || [];
      
      // Filter candidates
      let candidates = wordsInCategory.filter(w => !categoryHistory.includes(w.word));
      
      // If all used, reset history for this cat
      if (candidates.length === 0) {
        candidates = wordsInCategory;
      }

      const chosen = candidates[Math.floor(Math.random() * candidates.length)];
      const imposterId = Math.floor(Math.random() * settings.playerCount) + 1;
      const startingPlayerId = Math.floor(Math.random() * settings.playerCount) + 1;
      
      const players: Player[] = Array.from({ length: settings.playerCount }, (_, i) => {
        const id = i + 1;
        const isCustom = !!prev.playerNames[id];
        return {
          id,
          name: prev.playerNames[id] || `${UI_STRINGS[settings.language].player_label} ${id}`,
          role: id === imposterId ? 'IMPOSTER' : 'INNOCENT',
          isCustomName: isCustom
        };
      });

      // History logic: keep history but reset if we just used the last word
      const finalHistory = candidates.length === 1 && wordsInCategory.length > 1 ? [chosen.word] : [...categoryHistory, chosen.word];
      const newHistory = {
        ...prev.usedWords,
        [`${lang}_${category}`]: finalHistory
      };

      saveToLocalStorage(settings, newHistory);

      return {
        ...prev,
        settings,
        players,
        secretWord: chosen.word,
        imposterClue: chosen.imposterClue,
        imposterId,
        startingPlayerId,
        usedWords: newHistory,
        screen: GameScreen.REVEAL,
        currentTurnIndex: 0,
        roundId: (prev.roundId || 0) + 1
      };
    });
  }, [saveToLocalStorage]);

  const handleRevealNext = useCallback(() => {
    setState(s => {
      if (s.currentTurnIndex < s.settings.playerCount - 1) {
        return { ...s, currentTurnIndex: s.currentTurnIndex + 1 };
      } else {
        return { ...s, screen: GameScreen.DISCUSSION };
      }
    });
  }, []);

  const setScreen = useCallback((screen: GameState['screen']) => {
    setState(s => ({ ...s, screen }));
  }, []);

  const updatePlayerName = useCallback((playerId: number, name: string) => {
    setState(s => {
      const newPlayerNames = { ...s.playerNames, [playerId]: name };
      return {
        ...s,
        playerNames: newPlayerNames,
        players: s.players.map(p => p.id === playerId ? { ...p, name, isCustomName: true } : p)
      };
    });
  }, []);

  return {
    state,
    setScreen,
    handleLanguageChange,
    initGame,
    handleRevealNext,
    updatePlayerName,
  };
}
