import React, { useMemo, useState } from 'react';
import { GameScreen } from './types';
import { UI_STRINGS, UI_ICONS } from './constants';
import { useGameState } from './hooks/useGameState';
import { SEO } from './components/SEO';
import { Home } from './components/Home';
import { HowToPlay } from './components/HowToPlay';
import { Setup } from './components/Setup';
import { RoleReveal } from './components/RoleReveal';
import { Discussion } from './components/Discussion';
import { FinalResults } from './components/FinalResults';

export default function App() {
  const { state, setScreen, handleLanguageChange, initGame, handleRevealNext, updatePlayerName } = useGameState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const t = UI_STRINGS[state.settings.language];

  const handleNewWord = () => {
    initGame(state.settings);
    setIsMenuOpen(false);
  };

  const handleNewGame = () => {
    setScreen(GameScreen.HOME);
    setIsMenuOpen(false);
  };

  const currentComponent = useMemo(() => {
    const t = UI_STRINGS[state.settings.language];
    switch (state.screen) {
      case GameScreen.HOME:
        return (
          <Home 
            lang={state.settings.language} 
            onStart={() => setScreen(GameScreen.SETUP)} 
            onHowTo={() => setScreen(GameScreen.HOW_TO_PLAY)} 
            onLanguageChange={handleLanguageChange}
          />
        );
      case GameScreen.HOW_TO_PLAY:
        return (
          <HowToPlay 
            lang={state.settings.language} 
            onBack={() => setScreen(GameScreen.HOME)} 
          />
        );
      case GameScreen.SETUP:
        return (
          <Setup 
            initialSettings={state.settings}
            onBack={() => setScreen(GameScreen.HOME)} 
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
            category={state.currentCategory}
            imposterHint={state.imposterClue}
            showHints={state.settings.showImposterHints}
            isLast={state.currentTurnIndex === state.settings.playerCount - 1} 
            onNext={handleRevealNext} 
            onReroll={() => initGame(state.settings)}
            onUpdatePlayerName={updatePlayerName}
          />
        );
      case GameScreen.DISCUSSION:
        return (
          <Discussion 
            lang={state.settings.language}
            state={state}
            onRevealResults={() => setScreen(GameScreen.RESULTS)}
            onRestartRound={() => initGame(state.settings)}
            onUpdatePlayerName={updatePlayerName}
          />
        );
      case GameScreen.RESULTS:
        return (
          <FinalResults 
            lang={state.settings.language}
            state={state} 
            onNewGame={() => setScreen(GameScreen.HOME)} 
            onPlayAgain={() => initGame(state.settings)} 
            onUpdatePlayerName={updatePlayerName}
          />
        );
      default:
        return <div>Unknown Screen</div>;
    }
  }, [state, handleLanguageChange, initGame, handleRevealNext, setScreen]);

  return (
    <div className="min-h-screen relative">
      <SEO language={state.settings.language} />
      
      {[GameScreen.REVEAL, GameScreen.DISCUSSION, GameScreen.RESULTS].includes(state.screen) && (
        <div className="fixed top-4 left-4 z-50">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-3 backdrop-blur-md border border-white/20 rounded-2xl text-white shadow-xl active:scale-90 transition-all hover:bg-white/20 group ${isMenuOpen ? 'bg-white/20' : 'bg-white/10'}`}
            aria-label="Menu"
          >
            <UI_ICONS.Menu className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} />
          </button>

          {isMenuOpen && (
            <>
              <div 
                className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[-1] animate-in fade-in duration-300" 
                onClick={() => setIsMenuOpen(false)}
              />
              <div className="absolute top-16 left-0 w-56 bg-indigo-950/95 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-left">
                <button 
                  onClick={handleNewWord}
                  className="w-full flex items-center gap-4 px-6 py-5 text-white hover:bg-white/10 transition-colors border-b border-white/10 text-left"
                >
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                    <UI_ICONS.Refresh className="w-5 h-5 text-indigo-300" />
                  </div>
                  <span className="font-bold tracking-tight">{t.new_word}</span>
                </button>
                <button 
                  onClick={handleNewGame}
                  className="w-full flex items-center gap-4 px-6 py-5 text-white hover:bg-white/10 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-xl bg-rose-500/20 flex items-center justify-center">
                    <UI_ICONS.Home className="w-5 h-5 text-rose-300" />
                  </div>
                  <span className="font-bold tracking-tight">{t.new_game}</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {currentComponent}
    </div>
  );
}
