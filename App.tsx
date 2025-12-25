
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { GameScreen, GameSettings, Category, Player, GameState, WordEntry, Language } from './types';
import { WORD_LIST, UI_STRINGS, UI_ICONS } from './constants';

// --- Screen Components ---

const Home: React.FC<{ 
  lang: Language, 
  onStart: () => void, 
  onHowTo: () => void,
  onLanguageChange: (l: Language) => void
}> = ({ lang, onStart, onHowTo, onLanguageChange }) => {
  const t = UI_STRINGS[lang];
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center relative">
      {/* Language Switcher at Top */}
      <div className="absolute top-4 flex gap-2 bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur-sm">
        <button 
          onClick={() => onLanguageChange(Language.EN)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${lang === Language.EN ? 'bg-white text-indigo-900 shadow-lg' : 'text-white/60 hover:text-white'}`}
        >
          EN
        </button>
        <button 
          onClick={() => onLanguageChange(Language.SV)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${lang === Language.SV ? 'bg-white text-indigo-900 shadow-lg' : 'text-white/60 hover:text-white'}`}
        >
          SV
        </button>
      </div>

      <div className="mb-8 mt-12 relative">
        <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl rounded-full"></div>
        <h1 className="text-6xl font-black mb-2 tracking-tight drop-shadow-lg text-white font-game uppercase">{t.game_title}</h1>
        <p className="text-indigo-200 font-medium text-lg uppercase tracking-widest">{t.sub_title}</p>
      </div>
      
      <div className="space-y-4 w-full max-w-xs">
        <button 
          onClick={onStart}
          className="w-full bg-white text-indigo-900 py-4 px-8 rounded-2xl font-bold text-xl shadow-xl active:scale-95 transition-all hover:bg-indigo-50"
        >
          {t.play_game}
        </button>
        <button 
          onClick={onHowTo}
          className="w-full bg-white/10 text-white py-4 px-8 rounded-2xl font-semibold text-lg backdrop-blur-sm border border-white/20 active:scale-95 transition-all"
        >
          {t.how_to}
        </button>
      </div>

      <div className="mt-12 space-y-1">
        <div className="text-indigo-300 text-sm opacity-60 italic tracking-wider uppercase font-bold text-[10px] mb-2">
          "Pass and Play" Mode
        </div>
        <div className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-medium leading-relaxed">
          All rights reserved 2026
        </div>
        <div className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-medium leading-relaxed">
          Anton and Erik Studios
        </div>
      </div>
    </div>
  );
};

const HowToPlay: React.FC<{ lang: Language, onBack: () => void }> = ({ lang, onBack }) => {
  const t = UI_STRINGS[lang];
  return (
    <div className="p-6 max-w-md mx-auto h-full flex flex-col">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 mr-4 bg-white/10 rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-3xl font-bold font-game">{t.how_to}</h2>
      </div>
      
      <div className="flex-grow space-y-6 overflow-y-auto">
        <div className="bg-white/10 p-4 rounded-xl">
          <h3 className="text-xl font-bold mb-2 text-indigo-300 font-game">{t.how_step1_title}</h3>
          <p className="text-indigo-100/80">{t.how_step1_desc}</p>
        </div>
        <div className="bg-white/10 p-4 rounded-xl">
          <h3 className="text-xl font-bold mb-2 text-indigo-300 font-game">{t.how_step2_title}</h3>
          <p className="text-indigo-100/80">{t.how_step2_desc}</p>
        </div>
        <div className="bg-white/10 p-4 rounded-xl">
          <h3 className="text-xl font-bold mb-2 text-indigo-300 font-game">{t.how_step3_title}</h3>
          <p className="text-indigo-100/80">{t.how_step3_desc}</p>
        </div>
      </div>
    </div>
  );
};

const Setup: React.FC<{ initialSettings: GameSettings, onStartGame: (s: GameSettings) => void, onBack: () => void }> = ({ initialSettings, onStartGame, onBack }) => {
  const [settings, setSettings] = useState<GameSettings>(initialSettings);

  const t = UI_STRINGS[settings.language];

  return (
    <div className="p-6 max-w-md mx-auto pb-12">
      <div className="flex items-center mb-8">
        <button onClick={onBack} className="p-2 mr-4 bg-white/10 rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-3xl font-bold font-game">{t.setup_title}</h2>
      </div>

      <div className="space-y-8">
        <div>
          <label className="block text-indigo-200 text-sm font-bold uppercase mb-4 tracking-wider">{t.players}: {settings.playerCount}</label>
          <input 
            type="range" min="3" max="12" step="1"
            value={settings.playerCount}
            onChange={(e) => setSettings({...settings, playerCount: parseInt(e.target.value)})}
            className="w-full h-2 bg-indigo-900 rounded-lg appearance-none cursor-pointer accent-indigo-400"
          />
        </div>

        <div>
          <label className="block text-indigo-200 text-sm font-bold uppercase mb-4 tracking-wider">{t.difficulty}</label>
          <button
            onClick={() => setSettings({...settings, showImposterHints: !settings.showImposterHints})}
            className={`w-full py-4 px-6 rounded-2xl flex items-center justify-between border-2 transition-all ${settings.showImposterHints ? 'bg-indigo-500/20 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-white/60'}`}
          >
            <div className="text-left">
              <span className="block font-bold">{t.imposter_hints}</span>
              <span className="text-xs opacity-70">{settings.showImposterHints ? t.hints_on : t.hints_off}</span>
            </div>
            <div className={`w-12 h-6 rounded-full relative transition-colors ${settings.showImposterHints ? 'bg-indigo-400' : 'bg-gray-700'}`}>
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.showImposterHints ? 'left-7' : 'left-1'}`}></div>
            </div>
          </button>
        </div>

        <div>
          <label className="block text-indigo-200 text-sm font-bold uppercase mb-4 tracking-wider">{t.category}</label>
          <div className="grid grid-cols-2 gap-3">
            {Object.values(Category).map(cat => (
              <button
                key={cat}
                onClick={() => setSettings({...settings, category: cat})}
                className={`py-3 px-4 rounded-xl text-sm font-semibold border-2 transition-all ${settings.category === cat ? 'bg-indigo-500 border-white text-white' : 'bg-white/5 border-white/10 text-white/60'}`}
              >
                {t.category_names[cat]}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={() => onStartGame(settings)}
          className="w-full bg-white text-indigo-900 py-4 rounded-2xl font-bold text-xl shadow-xl active:scale-95 transition-all mt-6 hover:bg-indigo-50"
        >
          {t.start_game}
        </button>
      </div>
    </div>
  );
};

const RoleReveal: React.FC<{ 
  lang: Language,
  player: Player, 
  word: string, 
  category: Category,
  imposterHint: string,
  showHints: boolean,
  isLast: boolean, 
  onNext: () => void,
  onReroll: () => void
}> = ({ lang, player, word, category, imposterHint, showHints, isLast, onNext, onReroll }) => {
  const [revealed, setRevealed] = useState(false);
  const t = UI_STRINGS[lang];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      {!revealed ? (
        <div className="space-y-8 animate-in fade-in zoom-in duration-300 w-full max-w-xs">
          <div className="p-8 bg-indigo-500/20 rounded-full inline-block mb-4">
             <UI_ICONS.User className="w-16 h-16 text-indigo-300" />
          </div>
          <h2 className="text-4xl font-black font-game">{t.player_label} {player.id}</h2>
          <p className="text-indigo-200 text-lg">{t.role_reveal_prompt}</p>
          <button 
            onClick={() => setRevealed(true)}
            className="w-full bg-white text-indigo-900 py-4 rounded-2xl font-bold text-xl shadow-xl active:scale-95 transition-all"
          >
            {t.tap_to_reveal}
          </button>
        </div>
      ) : (
        <div className="space-y-8 animate-in flip-in-y duration-500 w-full max-w-sm">
          <h2 className="text-3xl font-bold text-indigo-200 uppercase tracking-widest font-game">{t.you_are}</h2>
          <div className={`p-8 rounded-3xl border-4 ${player.role === 'IMPOSTER' ? 'bg-rose-900/40 border-rose-500 shadow-[0_0_40px_rgba(244,63,94,0.3)]' : 'bg-emerald-900/40 border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.3)]'}`}>
            {player.role === 'IMPOSTER' ? (
              <div className="space-y-4">
                <UI_ICONS.AlertCircle className="w-16 h-16 mx-auto text-rose-500 animate-pulse" />
                <h3 className="text-5xl font-black text-rose-500 font-game uppercase">{t.imposter}</h3>
                {showHints ? (
                  <div className="pt-4 border-t border-rose-500/30">
                    <p className="text-rose-200 text-xs uppercase font-bold tracking-widest mb-2">{t.abstract_clue}</p>
                    <p className="text-2xl font-black text-white px-4 leading-tight tracking-tight uppercase italic">"{imposterHint}"</p>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-rose-500/30">
                    <p className="text-rose-200/60 text-xs uppercase font-bold tracking-widest mb-2 italic">{t.hard_mode_active}</p>
                    <p className="text-lg font-bold text-white px-4 leading-tight">{t.hard_mode_desc}</p>
                  </div>
                )}
                <div className="mt-4 inline-block bg-rose-500/20 border border-rose-500/40 rounded-full px-4 py-1">
                   <span className="text-xs font-bold text-rose-300 uppercase tracking-widest">{t.category}: {t.category_names[category]}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <UI_ICONS.Check className="w-16 h-16 mx-auto text-emerald-500" />
                <h3 className="text-2xl font-bold text-emerald-200 mb-2 uppercase tracking-widest font-game">{t.secret_word}</h3>
                <div className="text-5xl font-black text-emerald-400 drop-shadow-sm font-game uppercase tracking-tight">{word}</div>
                <div className="pt-2">
                  <span className="bg-emerald-500/20 text-emerald-300 text-xs px-3 py-1 rounded-full border border-emerald-500/30 font-bold uppercase tracking-widest">{t.category_names[category]}</span>
                </div>
                <p className="text-emerald-100/80 font-medium text-sm mt-4 italic">{t.describe_carefully}</p>
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <button 
              onClick={() => {
                setRevealed(false);
                onNext();
              }}
              className="w-full bg-white text-indigo-900 py-4 rounded-2xl font-bold text-xl shadow-xl active:scale-95 transition-all"
            >
              {isLast ? t.start_clue_round : t.hide_pass}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const FinalResults: React.FC<{ 
  lang: Language,
  state: GameState, 
  onNewGame: () => void, 
  onPlayAgain: () => void 
}> = ({ lang, state, onNewGame, onPlayAgain }) => {
  const imposter = state.players.find(p => p.role === 'IMPOSTER')!;
  const t = UI_STRINGS[lang];

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-screen text-center animate-in fade-in duration-700">
      <div className="mb-10">
        <h2 className="text-4xl font-black mb-4 uppercase tracking-tight font-game text-indigo-200">{t.secret_out}</h2>
        <p className="text-indigo-100 opacity-70">{t.imposter_identified}</p>
      </div>

      <div className="w-full max-w-md bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 space-y-8 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-rose-500/10 blur-3xl -ml-16 -mb-16"></div>

        <div>
          <span className="text-indigo-300 font-bold uppercase tracking-[0.2em] text-[10px] block mb-2">{t.secret_word}</span>
          <span className="text-5xl font-black text-white font-game drop-shadow-lg uppercase tracking-tight">{state.secretWord}</span>
        </div>

        <div className="pt-8 border-t border-white/10">
          <span className="text-rose-400 font-bold uppercase tracking-[0.2em] text-[10px] block mb-2">{t.imposter_was}</span>
          <div className="inline-flex items-center gap-4 bg-rose-500/20 border border-rose-500/40 px-8 py-4 rounded-2xl">
             <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center text-white font-black">{imposter.id}</div>
             <span className="text-3xl font-black text-rose-400 font-game uppercase">{t.player_label} {imposter.id}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 w-full max-w-xs">
        <button 
          onClick={onPlayAgain}
          className="w-full bg-white text-indigo-900 py-4 px-8 rounded-2xl font-bold text-xl shadow-xl active:scale-95 transition-all hover:bg-indigo-50"
        >
          {t.play_again}
        </button>
        <button 
          onClick={onNewGame}
          className="w-full bg-white/10 text-white py-4 px-8 rounded-2xl font-semibold text-lg backdrop-blur-sm border border-white/20 active:scale-95 transition-all hover:bg-white/20"
        >
          {t.main_menu}
        </button>
      </div>
    </div>
  );
};


// --- Main App Component ---

export default function App() {
  const [state, setState] = useState<GameState>({
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
    roundId: 0
  });

  // Load from local storage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('imposter_settings');
    const savedHistory = localStorage.getItem('imposter_history');
    
    if (savedSettings || savedHistory) {
      setState(s => ({
        ...s,
        settings: savedSettings ? { ...s.settings, ...JSON.parse(savedSettings) } : s.settings,
        usedWords: savedHistory ? JSON.parse(savedHistory) : {}
      }));
    }
  }, []);

  const saveToLocalStorage = useCallback((settings: GameSettings, history: Record<string, string[]>) => {
    localStorage.setItem('imposter_settings', JSON.stringify(settings));
    localStorage.setItem('imposter_history', JSON.stringify(history));
  }, []);

  const handleLanguageChange = useCallback((l: Language) => {
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
      
      const players: Player[] = Array.from({ length: settings.playerCount }, (_, i) => ({
        id: i + 1,
        name: `Player ${i + 1}`,
        role: (i + 1) === imposterId ? 'IMPOSTER' : 'INNOCENT'
      }));

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

  const currentComponent = useMemo(() => {
    const t = UI_STRINGS[state.settings.language];
    switch (state.screen) {
      case GameScreen.HOME:
        return (
          <Home 
            lang={state.settings.language} 
            onStart={() => setState(s => ({ ...s, screen: GameScreen.SETUP }))} 
            onHowTo={() => setState(s => ({ ...s, screen: GameScreen.HOW_TO_PLAY }))} 
            onLanguageChange={handleLanguageChange}
          />
        );
      case GameScreen.HOW_TO_PLAY:
        return <HowToPlay lang={state.settings.language} onBack={() => setState(s => ({ ...s, screen: GameScreen.HOME }))} />;
      case GameScreen.SETUP:
        return (
          <Setup 
            initialSettings={state.settings}
            onBack={() => setState(s => ({ ...s, screen: GameScreen.HOME }))} 
            onStartGame={initGame} 
          />
        );
      case GameScreen.REVEAL:
        return (
          <RoleReveal 
            key={`reveal-${state.roundId}-${state.currentTurnIndex}`}
            lang={state.settings.language}
            player={state.players[state.currentTurnIndex]} 
            word={state.secretWord} 
            category={state.settings.category}
            imposterHint={state.imposterClue}
            showHints={state.settings.showImposterHints}
            isLast={state.currentTurnIndex === state.settings.playerCount - 1} 
            onNext={handleRevealNext} 
            onReroll={() => initGame(state.settings)}
          />
        );
      case GameScreen.DISCUSSION:
        return (
          <div key={`discussion-${state.roundId}`} className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center animate-in fade-in duration-500">
             <div className="p-8 bg-indigo-500/20 rounded-full inline-block mb-6">
                <svg className="w-16 h-16 text-indigo-300 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
             </div>
             <h2 className="text-4xl font-black mb-2 font-game uppercase tracking-tight">{t.discussion_title}</h2>
             
             <div className="bg-indigo-500/30 border border-indigo-400/40 rounded-3xl p-6 mb-10 w-full max-w-xs shadow-xl">
                <span className="text-indigo-200 text-xs font-bold uppercase tracking-[0.2em] mb-2 block">{t.first_to_clue}</span>
                <div className="text-3xl font-black text-white font-game uppercase tracking-tight">{t.player_label} {state.startingPlayerId}</div>
             </div>

             <p className="text-indigo-200 text-base mb-12 max-w-xs leading-relaxed opacity-80 font-medium px-4 text-center">
               {t.discussion_desc.replace('{id}', state.startingPlayerId.toString())}
             </p>

             <div className="w-full max-w-xs space-y-3">
               <button 
                onClick={() => setState(s => ({ ...s, screen: GameScreen.RESULTS }))}
                className="w-full bg-white text-indigo-900 py-4 rounded-2xl font-bold text-xl shadow-xl active:scale-95 transition-all hover:bg-indigo-50"
              >
                {t.reveal_results}
              </button>
              <button 
                onClick={() => {
                   if (window.confirm(t.restart_round + '?')) {
                      initGame(state.settings);
                   }
                }}
                className="w-full bg-white/10 text-white/60 py-2 rounded-xl font-bold text-xs uppercase tracking-widest border border-white/5 hover:bg-white/20 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <UI_ICONS.Refresh className="w-3 h-3" />
                {t.restart_round}
              </button>
             </div>
          </div>
        );
      case GameScreen.RESULTS:
        return (
          <FinalResults 
            lang={state.settings.language}
            state={state} 
            onNewGame={() => setState(s => ({ ...s, screen: GameScreen.HOME }))} 
            onPlayAgain={() => initGame(state.settings)} 
          />
        );
      default:
        return <div>Unknown Screen</div>;
    }
  }, [state, handleLanguageChange, initGame, handleRevealNext]);

  return (
    <div className="min-h-screen">
      {currentComponent}
    </div>
  );
}
