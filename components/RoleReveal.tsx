import React, { useState } from 'react';
import { Language, Player, Category } from '../types';
import { UI_STRINGS, UI_ICONS } from '../constants';

interface RoleRevealProps {
  lang: Language;
  player: Player;
  word: string;
  category: Category;
  imposterHint: string;
  showHints: boolean;
  isLast: boolean;
  onNext: () => void;
  onReroll: () => void;
  onUpdatePlayerName: (id: number, name: string) => void;
}

export const RoleReveal: React.FC<RoleRevealProps> = ({ 
  lang, 
  player, 
  word, 
  category, 
  imposterHint, 
  showHints, 
  isLast, 
  onNext, 
  onReroll,
  onUpdatePlayerName
}) => {
  const [revealed, setRevealed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(player.name);
  const t = UI_STRINGS[lang];

  const handleNameClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setEditName(player.name);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editName.trim()) {
      onUpdatePlayerName(player.id, editName.trim());
    }
    setIsEditing(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      {!revealed ? (
        <div className="space-y-8 animate-in fade-in zoom-in duration-300 w-full max-w-xs">
          <div className="p-8 bg-indigo-500/20 rounded-full inline-block mb-4">
             <UI_ICONS.User className="w-16 h-16 text-indigo-300" />
          </div>
          <div className="relative group">
            {isEditing ? (
              <form onSubmit={handleNameSubmit} className="animate-in fade-in zoom-in duration-200">
                <input
                  autoFocus
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onBlur={handleNameSubmit}
                  className="text-4xl font-black font-game bg-white/10 border-b-2 border-white/50 outline-none text-center w-full px-2 py-1 rounded-t-xl text-white"
                />
              </form>
            ) : (
              <div className="space-y-1">
                <h2 
                  onClick={handleNameClick}
                  className="text-4xl font-black font-game cursor-pointer hover:text-indigo-300 transition-colors flex items-center justify-center gap-2 group"
                >
                  {player.name}
                  <svg className="w-5 h-5 opacity-0 group-hover:opacity-50 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </h2>
                {!player.isCustomName && (
                  <p className="text-indigo-300/60 text-xs font-bold uppercase tracking-widest">{t.tap_to_rename}</p>
                )}
              </div>
            )}
          </div>
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
    </main>
  );
};
