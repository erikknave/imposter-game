import { useState, useEffect, useCallback } from 'react';
import { GameState, GameSettings, Category, Language, Player, WordEntry, GameScreen } from '../types';
import { WORD_LIST, UI_STRINGS } from '../constants';

const detectBrowserLanguage = (): Language => {
  try {
    const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || 'en';
    const langCode = browserLang.split('-')[0].toLowerCase();
    
    if (langCode === 'sv') return Language.SV;
    if (langCode === 'fr') return Language.FR;
    if (langCode === 'es') return Language.ES;
    if (langCode === 'de') return Language.DE;
    if (langCode === 'hi') return Language.HI;
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
    if (path === 'es') return Language.ES;
    if (path === 'de') return Language.DE;
    if (path === 'hi') return Language.HI;
    if (path === 'zh' || path === 'zh-cn') return Language.ZH;
    if (path === 'en') return Language.EN;
    
    // Fallback to hash for backward compatibility
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash === 'sv') return Language.SV;
    if (hash === 'fr') return Language.FR;
    if (hash === 'es') return Language.ES;
    if (hash === 'de') return Language.DE;
    if (hash === 'hi') return Language.HI;
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
    categories: [Category.ALL],
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
  roundId: 0,
  currentCategory: Category.ALL
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
      const categories = settings.categories;
      
      interface WordWithCat {
        word: WordEntry;
        cat: Category;
      }

      let wordsWithCategory: WordWithCat[] = [];
      if (categories.includes(Category.ALL)) {
        // Flatten all categories except ALL itself
        Object.entries(WORD_LIST[lang])
          .filter(([cat]) => cat !== Category.ALL)
          .forEach(([cat, words]) => {
            words.forEach(w => wordsWithCategory.push({ word: w, cat: cat as Category }));
          });
      } else {
        categories.forEach(cat => {
          const words = WORD_LIST[lang][cat] || [];
          words.forEach(w => wordsWithCategory.push({ word: w, cat }));
        });
      }

      const allRelevantCats = categories.includes(Category.ALL)
        ? Object.values(Category).filter(c => c !== Category.ALL)
        : categories;

      const combinedHistory = allRelevantCats.reduce((acc, cat) => {
        const catHistory = prev.usedWords[`${lang}_${cat}`] || [];
        return [...acc, ...catHistory];
      }, [] as string[]);

      // Also include history from the legacy 'All' key if present
      const legacyAllHistory = prev.usedWords[`${lang}_${Category.ALL}`] || [];
      const totalHistory = [...combinedHistory, ...legacyAllHistory];
      
      // Filter candidates
      let candidates = wordsWithCategory.filter(w => !totalHistory.includes(w.word.word));
      
      // If all used, reset for these candidates
      if (candidates.length === 0) {
        candidates = wordsWithCategory;
      }

      const chosenEntry = candidates[Math.floor(Math.random() * candidates.length)];
      const chosen = chosenEntry.word;
      const chosenCat = chosenEntry.cat;

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

      // Update history for the specific category the word came from
      const wordsInChosenCat = WORD_LIST[lang][chosenCat] || [];
      const currentCatHistory = prev.usedWords[`${lang}_${chosenCat}`] || [];
      
      let newCatHistory: string[];
      if (currentCatHistory.length + 1 >= wordsInChosenCat.length) {
        newCatHistory = [chosen.word];
      } else {
        newCatHistory = [...currentCatHistory, chosen.word];
      }

      const newHistory = {
        ...prev.usedWords,
        [`${lang}_${chosenCat}`]: newCatHistory
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
        roundId: (prev.roundId || 0) + 1,
        currentCategory: chosenCat
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
