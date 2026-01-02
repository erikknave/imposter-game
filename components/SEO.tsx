import { useEffect } from 'react';
import { Language } from '../types';

interface SEOProps {
  language: Language;
}

const SEO_META: Record<Language, {
  title: string;
  description: string;
  keywords: string;
}> = {
  [Language.EN]: {
    title: 'Imposter Game - Social Deduction Party Game | Pass & Play',
    description: 'Play Imposter, a fun social deduction game where players give clues to a secret word while one hidden Imposter tries to blend in. Perfect for parties and friends!',
    keywords: 'imposter game, social deduction game, party game, word guessing game, pass and play game, among us style game, mafia game'
  },
  [Language.SV]: {
    title: 'Imposter Spel - Socialt Detektivspel | Passa & Spela',
    description: 'Spela Imposter, ett roligt socialt deduktionsspel där spelare ger ledtrådar till ett hemligt ord medan en dold Imposter försöker smälta in. Perfekt för fester och vänner!',
    keywords: 'imposter spel, socialt deduktionsspel, festspel, ordgissningsspel, passa och spela spel'
  },
  [Language.FR]: {
    title: 'Jeu Imposteur - Jeu de Dédduction Sociale | Passe & Joue',
    description: 'Jouez à Imposteur, un jeu amusant de déduction sociale où les joueurs donnent des indices sur un mot secret tandis qu\'un Imposteur caché essaie de se fondre. Parfait pour les fêtes et les amis!',
    keywords: 'jeu imposteur, jeu de déduction sociale, jeu de fête, jeu de devinette de mots, passe et joue'
  },
  [Language.ZH]: {
    title: '内鬼游戏 - 社交推理派对游戏 | 传递游戏',
    description: '玩内鬼游戏，一个有趣的社交推理游戏，玩家给一个秘密词提供线索，而一个隐藏的内鬼试图融入。非常适合聚会和朋友！',
    keywords: '内鬼游戏, 社交推理游戏, 派对游戏, 猜词游戏, 传递游戏'
  },
  [Language.ES]: {
    title: 'Juego del Impostor - Juego de Mesa de Deducción Social | Pasa y Juega',
    description: 'Juega al Impostor, un divertido juego de deducción social donde los jugadores dan pistas sobre una palabra secreta mientras un Impostor oculto intenta mezclarse. ¡Ideal para fiestas!',
    keywords: 'juego del impostor, juego de deducción social, juego de mesa, juego de adivinar palabras, pasa y juega, juego estilo among us'
  },
  [Language.HI]: {
    title: 'इम्पोस्टर गेम - सामाजिक कटौती पार्टी गेम | पास एंड प्ले',
    description: 'इम्पोस्टर खेलें, एक मजेदार सामाजिक कटौती खेल जहाँ खिलाड़ी एक गुप्त शब्द के संकेत देते हैं जबकि एक छिपा हुआ इम्पोस्टर घुलने-मिलने की कोशिश करता है। पार्टियों के लिए बिल्कुल सही!',
    keywords: 'इम्पोस्टर गेम, सामाजिक कटौती खेल, पार्टी गेम, शब्द अनुमान लगाने वाला खेल, पास और प्ले खेल'
  },
  [Language.DE]: {
    title: 'Imposter Spiel - Social Deduction Party Spiel | Pass & Play',
    description: 'Spiele Imposter, ein lustiges Social Deduction Spiel, bei dem Spieler Hinweise auf ein geheimes Wort geben, während ein versteckter Imposter versucht, sich anzupassen. Perfekt für Partys!',
    keywords: 'imposter spiel, social deduction spiel, party spiel, wort ratespiel, pass and play spiel, among us stil spiel'
  },
  [Language.RU]: {
    title: 'Игра Самозванец - Социальная дедуктивная пати-игра | Передай и играй',
    description: 'Играйте в "Самозванца", веселую игру на социальную дедукцию, где игроки дают подсказки к секретному слову, а один скрытый Самозванец пытается не выдать себя. Идеально для вечеринок!',
    keywords: 'игра самозванец, социальная дедукция, пати-игра, игра в слова, передай и играй, игра в стиле among us, мафия'
  }
};

export const SEO: React.FC<SEOProps> = ({ language }) => {
  useEffect(() => {
    const meta = SEO_META[language];
    const baseUrl = 'https://imposterplay.com';
    const langPath = language === Language.EN ? '' : (language === Language.ZH ? '/zh' : `/${language}`);
    const currentUrl = `${baseUrl}${langPath}`;

    // Update document title
    document.title = meta.title;

    // Update HTML lang attribute
    document.documentElement.lang = language === Language.ZH ? 'zh-CN' : language;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Basic meta tags
    updateMetaTag('description', meta.description);
    updateMetaTag('keywords', meta.keywords);

    // Open Graph tags
    updateMetaTag('og:title', meta.title, 'property');
    updateMetaTag('og:description', meta.description, 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:url', currentUrl, 'property');
    updateMetaTag('og:site_name', 'Imposter Game', 'property');
    updateMetaTag('og:image', `${baseUrl}/og-image.svg`, 'property');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', meta.title);
    updateMetaTag('twitter:description', meta.description);
    updateMetaTag('twitter:image', `${baseUrl}/og-image.svg`);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = currentUrl;

    // Hreflang tags for language alternates
    const languages = [Language.EN, Language.SV, Language.FR, Language.ES, Language.DE, Language.HI, Language.ZH, Language.RU];
    languages.forEach(lang => {
      const code = lang === Language.ZH ? 'zh-CN' : lang;
      const path = lang === Language.EN ? '' : (lang === Language.ZH ? '/zh' : `/${lang}`);
      let hreflang = document.querySelector(`link[rel="alternate"][hreflang="${code}"]`) as HTMLLinkElement;
      if (!hreflang) {
        hreflang = document.createElement('link');
        hreflang.rel = 'alternate';
        hreflang.hreflang = code;
        document.head.appendChild(hreflang);
      }
      hreflang.href = `${baseUrl}${path}`;
    });

    // Add x-default hreflang
    let xDefault = document.querySelector('link[rel="alternate"][hreflang="x-default"]') as HTMLLinkElement;
    if (!xDefault) {
      xDefault = document.createElement('link');
      xDefault.rel = 'alternate';
      xDefault.hreflang = 'x-default';
      document.head.appendChild(xDefault);
    }
    xDefault.href = baseUrl;

    // Structured Data (JSON-LD)
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Game',
      name: 'Imposter Game',
      description: meta.description,
      gameLocation: {
        '@type': 'VirtualLocation',
        url: currentUrl
      },
      numberOfPlayers: {
        minValue: 3,
        maxValue: 12
      },
      gameItem: {
        '@type': 'Thing',
        name: 'Social Deduction Game'
      },
      inLanguage: language === Language.ZH ? 'zh-CN' : language,
      applicationCategory: 'Game',
      operatingSystem: 'Web Browser'
    };

    // Remove existing structured data scripts
    document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // WebApplication structured data
    const webAppData = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Imposter Game',
      description: meta.description,
      url: currentUrl,
      applicationCategory: 'GameApplication',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      inLanguage: language === Language.ZH ? 'zh-CN' : language
    };

    const webAppScript = document.createElement('script');
    webAppScript.type = 'application/ld+json';
    webAppScript.textContent = JSON.stringify(webAppData);
    document.head.appendChild(webAppScript);
  }, [language]);

  return null;
};
