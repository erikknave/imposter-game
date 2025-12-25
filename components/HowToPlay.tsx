import React from 'react';
import { Language } from '../types';
import { UI_STRINGS } from '../constants';

interface HowToPlayProps {
  lang: Language;
  onBack: () => void;
}

export const HowToPlay: React.FC<HowToPlayProps> = ({ lang, onBack }) => {
  const t = UI_STRINGS[lang];
  return (
    <main className="p-6 max-w-md mx-auto h-full flex flex-col">
      <header className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 mr-4 bg-white/10 rounded-full" aria-label="Go back">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-3xl font-bold font-game">{t.how_to}</h2>
      </header>
      
      <div className="flex-grow space-y-6 overflow-y-auto">
        <article className="bg-white/10 p-4 rounded-xl">
          <h3 className="text-xl font-bold mb-2 text-indigo-300 font-game">{t.how_step1_title}</h3>
          <p className="text-indigo-100/80">{t.how_step1_desc}</p>
        </article>
        <article className="bg-white/10 p-4 rounded-xl">
          <h3 className="text-xl font-bold mb-2 text-indigo-300 font-game">{t.how_step2_title}</h3>
          <p className="text-indigo-100/80">{t.how_step2_desc}</p>
        </article>
        <article className="bg-white/10 p-4 rounded-xl">
          <h3 className="text-xl font-bold mb-2 text-indigo-300 font-game">{t.how_step3_title}</h3>
          <p className="text-indigo-100/80">{t.how_step3_desc}</p>
        </article>
      </div>
    </main>
  );
};
