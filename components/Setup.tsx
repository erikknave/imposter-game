import React, { useState } from 'react';
import { GameSettings, Category } from '../types';
import { UI_STRINGS } from '../constants';

interface SetupProps {
  initialSettings: GameSettings;
  onStartGame: (s: GameSettings) => void;
  onBack: () => void;
}

export const Setup: React.FC<SetupProps> = ({ initialSettings, onStartGame, onBack }) => {
  const [settings, setSettings] = useState<GameSettings>(initialSettings);

  const t = UI_STRINGS[settings.language];

  return (
    <main className="p-6 max-w-md mx-auto pb-12">
      <header className="flex items-center mb-8">
        <button onClick={onBack} className="p-2 mr-4 bg-white/10 rounded-full" aria-label="Go back">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-3xl font-bold font-game">{t.setup_title}</h2>
      </header>

      <section className="space-y-8">
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
            {Object.values(Category).map(cat => {
              const isSelected = settings.categories.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => {
                    let newCats: Category[];
                    if (cat === Category.ALL) {
                      newCats = [Category.ALL];
                    } else {
                      // Remove ALL if selecting a specific category
                      const filtered = settings.categories.filter(c => c !== Category.ALL);
                      if (isSelected) {
                        // Deselect
                        newCats = filtered.filter(c => c !== cat);
                        // If empty, default back to ALL or keep empty (but initGame might fail if empty)
                        if (newCats.length === 0) newCats = [Category.ALL];
                      } else {
                        // Select
                        newCats = [...filtered, cat];
                      }
                    }
                    setSettings({...settings, categories: newCats});
                  }}
                  className={`py-3 px-4 rounded-xl text-sm font-semibold border-2 transition-all ${isSelected ? 'bg-indigo-500 border-white text-white' : 'bg-white/5 border-white/10 text-white/60'}`}
                >
                  {t.category_names[cat]}
                </button>
              );
            })}
          </div>
        </div>

        <button 
          onClick={() => onStartGame(settings)}
          className="w-full bg-white text-indigo-900 py-4 rounded-2xl font-bold text-xl shadow-xl active:scale-95 transition-all mt-6 hover:bg-indigo-50"
        >
          {t.start_game}
        </button>
      </section>
    </main>
  );
};
