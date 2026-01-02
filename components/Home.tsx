import React from 'react';
import { Language } from '../types';
import { UI_STRINGS } from '../constants';

interface HomeProps {
  lang: Language;
  onStart: () => void;
  onHowTo: () => void;
  onLanguageChange: (l: Language) => void;
}

export const Home: React.FC<HomeProps> = ({ lang, onStart, onHowTo, onLanguageChange }) => {
  const t = UI_STRINGS[lang];
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center relative">
      {/* Language Switcher at Top */}
      <nav className="absolute top-4 flex gap-2 bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur-sm" aria-label="Language selection">
        <button 
          onClick={() => onLanguageChange(Language.EN)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${lang === Language.EN ? 'bg-white text-indigo-900 shadow-lg' : 'text-white/60 hover:text-white'}`}
          aria-label="English"
        >
          EN
        </button>
        <button 
          onClick={() => onLanguageChange(Language.SV)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${lang === Language.SV ? 'bg-white text-indigo-900 shadow-lg' : 'text-white/60 hover:text-white'}`}
          aria-label="Svenska"
        >
          SV
        </button>
        <button 
          onClick={() => onLanguageChange(Language.FR)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${lang === Language.FR ? 'bg-white text-indigo-900 shadow-lg' : 'text-white/60 hover:text-white'}`}
          aria-label="Français"
        >
          FR
        </button>
        <button 
          onClick={() => onLanguageChange(Language.ES)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${lang === Language.ES ? 'bg-white text-indigo-900 shadow-lg' : 'text-white/60 hover:text-white'}`}
          aria-label="Español"
        >
          ES
        </button>
        <button 
          onClick={() => onLanguageChange(Language.DE)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${lang === Language.DE ? 'bg-white text-indigo-900 shadow-lg' : 'text-white/60 hover:text-white'}`}
          aria-label="Deutsch"
        >
          DE
        </button>
        <button 
          onClick={() => onLanguageChange(Language.HI)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${lang === Language.HI ? 'bg-white text-indigo-900 shadow-lg' : 'text-white/60 hover:text-white'}`}
          aria-label="हिंदी"
        >
          HI
        </button>
        <button 
          onClick={() => onLanguageChange(Language.RU)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${lang === Language.RU ? 'bg-white text-indigo-900 shadow-lg' : 'text-white/60 hover:text-white'}`}
          aria-label="Русский"
        >
          RU
        </button>
        <button 
          onClick={() => onLanguageChange(Language.ZH)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${lang === Language.ZH ? 'bg-white text-indigo-900 shadow-lg' : 'text-white/60 hover:text-white'}`}
          aria-label="中文"
        >
          ZH
        </button>
      </nav>

      <header className="mb-8 mt-12 relative">
        <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl rounded-full"></div>
        <h1 className="text-6xl font-black mb-2 tracking-tight drop-shadow-lg text-white font-game uppercase">{t.game_title}</h1>
        <p className="text-indigo-200 font-medium text-lg uppercase tracking-widest">{t.sub_title}</p>
      </header>
      
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

      <footer className="mt-12 space-y-1">
        <div className="text-indigo-300 text-sm opacity-60 italic tracking-wider uppercase font-bold text-[10px] mb-2">
          "Pass and Play" Mode
        </div>
        <div className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-medium leading-relaxed">
          All rights reserved 2026
        </div>
        <div className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-medium leading-relaxed">
          Anton and Erik Studios
        </div>
      </footer>

      {/* Visually Hidden SEO Content Section for Search Engines */}
      <section className="sr-only">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          <div>
            <h2>{t.how_step1_title}</h2>
            <p>{t.how_step1_desc}</p>
          </div>
          <div>
            <h2>{t.how_step2_title}</h2>
            <p>{t.how_step2_desc}</p>
          </div>
          <div>
            <h2>{t.how_step3_title}</h2>
            <p>{t.how_step3_desc}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <p>
            {t.game_title} is a {t.sub_title} designed for "Pass and Play" with friends. 
            Discover the hidden imposter using subtle clues and social deduction. This party game is perfect for groups who love word guessing and identifying the odd one out.
          </p>
          <p>
            Whether you are at a party, traveling, or just hanging out, {t.game_title} offers an engaging experience across multiple languages including English, Swedish, French, and Chinese.
            Challenge your friends, sharpen your intuition, and enjoy this modern take on classic social deduction mechanics.
          </p>
        </div>
      </section>
    </main>
  );
};
