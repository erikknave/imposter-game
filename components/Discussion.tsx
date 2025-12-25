import React, { useState } from 'react';
import { Language, GameState } from '../types';
import { UI_STRINGS, UI_ICONS } from '../constants';

interface DiscussionProps {
  lang: Language;
  state: GameState;
  onRevealResults: () => void;
  onRestartRound: () => void;
  onUpdatePlayerName: (id: number, name: string) => void;
}

export const Discussion: React.FC<DiscussionProps> = ({ lang, state, onRevealResults, onRestartRound, onUpdatePlayerName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const startingPlayer = state.players.find(p => p.id === state.startingPlayerId) || state.players[0];
  const [editName, setEditName] = useState(startingPlayer.name);
  const t = UI_STRINGS[lang];

  const handleNameClick = () => {
    setIsEditing(true);
    setEditName(startingPlayer.name);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editName.trim()) {
      onUpdatePlayerName(startingPlayer.id, editName.trim());
    }
    setIsEditing(false);
  };

  return (
    <main key={`discussion-${state.roundId}`} className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center animate-in fade-in duration-500">
       <header className="p-8 bg-indigo-500/20 rounded-full inline-block mb-6">
          <svg className="w-16 h-16 text-indigo-300 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
       </header>
       <h2 className="text-4xl font-black mb-2 font-game uppercase tracking-tight">{t.discussion_title}</h2>
       
       <div className="bg-indigo-500/30 border border-indigo-400/40 rounded-3xl p-6 mb-10 w-full max-w-xs shadow-xl">
          <span className="text-indigo-200 text-xs font-bold uppercase tracking-[0.2em] mb-2 block">{t.first_to_clue}</span>
          {isEditing ? (
            <form onSubmit={handleNameSubmit} className="animate-in fade-in zoom-in duration-200">
              <input
                autoFocus
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onBlur={handleNameSubmit}
                className="text-3xl font-black text-white font-game bg-transparent border-b border-white/50 outline-none text-center w-full px-2"
              />
            </form>
          ) : (
            <div 
              onClick={handleNameClick}
              className="text-3xl font-black text-white font-game uppercase tracking-tight cursor-pointer hover:text-indigo-200 transition-colors flex items-center justify-center gap-2 group"
            >
              {startingPlayer.name}
              <svg className="w-4 h-4 opacity-0 group-hover:opacity-50 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
          )}
       </div>

       <p className="text-indigo-200 text-base mb-12 max-w-xs leading-relaxed opacity-80 font-medium px-4 text-center">
         {t.discussion_desc.replace('{id}', startingPlayer.name)}
       </p>

       <div className="w-full max-w-xs space-y-3">
          <button 
           onClick={onRevealResults}
           className="w-full bg-white text-indigo-900 py-4 rounded-2xl font-bold text-xl shadow-xl active:scale-95 transition-all hover:bg-indigo-50"
         >
           {t.reveal_results}
         </button>
         <button 
           onClick={() => {
              if (window.confirm(t.restart_round + '?')) {
                 onRestartRound();
              }
           }}
           className="w-full bg-white/10 text-white/60 py-2 rounded-xl font-bold text-xs uppercase tracking-widest border border-white/5 hover:bg-white/20 hover:text-white transition-all flex items-center justify-center gap-2"
         >
           <UI_ICONS.Refresh className="w-3 h-3" />
           {t.restart_round}
         </button>
       </div>
    </main>
  );
};
