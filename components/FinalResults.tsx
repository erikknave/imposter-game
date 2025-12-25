import React, { useState } from 'react';
import { Language, GameState } from '../types';
import { UI_STRINGS } from '../constants';

interface FinalResultsProps {
  lang: Language;
  state: GameState;
  onNewGame: () => void;
  onPlayAgain: () => void;
  onUpdatePlayerName: (id: number, name: string) => void;
}

export const FinalResults: React.FC<FinalResultsProps> = ({ lang, state, onNewGame, onPlayAgain, onUpdatePlayerName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const imposter = state.players.find(p => p.role === 'IMPOSTER')!;
  const [editName, setEditName] = useState(imposter.name);
  const t = UI_STRINGS[lang];

  const handleNameClick = () => {
    setIsEditing(true);
    setEditName(imposter.name);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editName.trim()) {
      onUpdatePlayerName(imposter.id, editName.trim());
    }
    setIsEditing(false);
  };

  return (
    <main className="p-8 flex flex-col items-center justify-center min-h-screen text-center animate-in fade-in duration-700">
      <header className="mb-10">
        <h2 className="text-4xl font-black mb-4 uppercase tracking-tight font-game text-indigo-200">{t.secret_out}</h2>
        <p className="text-indigo-100 opacity-70">{t.imposter_identified}</p>
      </header>

      <div className="w-full max-w-md bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 space-y-8 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-rose-500/10 blur-3xl -ml-16 -mb-16"></div>

        <div>
          <span className="text-indigo-300 font-bold uppercase tracking-[0.2em] text-[10px] block mb-2">{t.secret_word}</span>
          <span className="text-5xl font-black text-white font-game drop-shadow-lg uppercase tracking-tight">{state.secretWord}</span>
        </div>

        <div className="pt-8 border-t border-white/10">
          <span className="text-rose-400 font-bold uppercase tracking-[0.2em] text-[10px] block mb-2">{t.imposter_was}</span>
          <div className="inline-flex items-center gap-4 bg-rose-500/20 border border-rose-500/40 px-8 py-4 rounded-2xl relative">
             <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center text-white font-black shrink-0">{imposter.id}</div>
             {isEditing ? (
               <form onSubmit={handleNameSubmit} className="animate-in fade-in zoom-in duration-200">
                 <input
                   autoFocus
                   type="text"
                   value={editName}
                   onChange={(e) => setEditName(e.target.value)}
                   onBlur={handleNameSubmit}
                   className="text-3xl font-black text-rose-400 font-game bg-transparent border-b border-rose-500/50 outline-none text-left px-2 w-full"
                 />
               </form>
             ) : (
               <span 
                 onClick={handleNameClick}
                 className="text-3xl font-black text-rose-400 font-game uppercase cursor-pointer hover:text-rose-300 transition-colors flex items-center gap-2 group"
               >
                 {imposter.name}
                 <svg className="w-5 h-5 opacity-0 group-hover:opacity-50 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                 </svg>
               </span>
             )}
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
    </main>
  );
};
