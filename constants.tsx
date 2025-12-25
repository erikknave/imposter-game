
import { Category, WordEntry, Language } from './types';

export const WORD_LIST: Record<Language, Record<string, WordEntry[]>> = {
  [Language.EN]: {
    [Category.GENERAL]: [
      { word: 'Bicycle', imposterClue: 'It relies on individual effort' },
      { word: 'Television', imposterClue: 'A source of shared observation' },
      { word: 'Umbrella', imposterClue: 'Used only in specific conditions' },
      { word: 'Backpack', imposterClue: 'Something that holds your journey' },
      { word: 'Keyboard', imposterClue: 'A tool for creating structure' },
      { word: 'Candle', imposterClue: 'Something that slowly disappears' },
      { word: 'Telescope', imposterClue: 'It brings the distant closer' },
      { word: 'Hammer', imposterClue: 'A tool of impact and force' },
      { word: 'Mirror', imposterClue: 'It shows what is already there' },
      { word: 'Piano', imposterClue: 'A complex system of vibrations' },
      { word: 'Clock', imposterClue: 'A relentless measuring device' },
      { word: 'Scissors', imposterClue: 'It divides what was once whole' },
      { word: 'Wallet', imposterClue: 'A keeper of personal value' },
      { word: 'Battery', imposterClue: 'A container of hidden potential' },
      { word: 'Guitar', imposterClue: 'It requires manual dexterity' },
      { word: 'Soap', imposterClue: 'Something that washes away' },
      { word: 'Camera', imposterClue: 'It stops the flow of time' },
      { word: 'Map', imposterClue: 'A representation of reality' }
    ],
    [Category.MOVIES]: [
      { word: 'Titanic', imposterClue: 'A story of inevitable tragedy' },
      { word: 'Inception', imposterClue: 'A journey through layers of reality' },
      { word: 'Jaws', imposterClue: 'The fear of what lies beneath' },
      { word: 'Avatar', imposterClue: 'A clash between worlds' },
      { word: 'Batman', imposterClue: 'A figure rising from darkness' },
      { word: 'Star Wars', imposterClue: 'An ancient conflict in a new setting' },
      { word: 'Harry Potter', imposterClue: 'A child born for a destiny' },
      { word: 'Toy Story', imposterClue: 'The secret life of the inanimate' },
      { word: 'Jurassic Park', imposterClue: 'Science exceeding its limits' },
      { word: 'The Lion King', imposterClue: 'A cycle of life and leadership' },
      { word: 'Shrek', imposterClue: 'Beauty found in the unusual' },
      { word: 'Gladiator', imposterClue: 'A quest for honor in the dust' },
      { word: 'The Matrix', imposterClue: 'Choosing between truth and comfort' },
      { word: 'Frozen', imposterClue: 'The power of internal coldness' },
      { word: 'Spider-Man', imposterClue: 'Power balanced by duty' }
    ],
    [Category.PLACES]: [
      { word: 'Paris', imposterClue: 'A place of cultural significance' },
      { word: 'Egypt', imposterClue: 'A land of ancient mysteries' },
      { word: 'Tokyo', imposterClue: 'Where the future meets tradition' },
      { word: 'Sydney', imposterClue: 'A landmark by the ocean' },
      { word: 'Hawaii', imposterClue: 'A paradise born from fire' },
      { word: 'London', imposterClue: 'A city built on fog and history' },
      { word: 'New York', imposterClue: 'A vertical forest of concrete' },
      { word: 'Antarctica', imposterClue: 'The edge of the world' },
      { word: 'The Sahara', imposterClue: 'A vast, unforgiving landscape' },
      { word: 'Mars', imposterClue: 'The next frontier for humanity' },
      { word: 'Mount Everest', imposterClue: 'The ultimate physical challenge' },
      { word: 'Great Wall', imposterClue: 'A boundary made of stone' },
      { word: 'Venice', imposterClue: 'A place slowly being reclaimed' },
      { word: 'Hollywood', imposterClue: 'A factory of modern myths' },
      { word: 'Grand Canyon', imposterClue: 'A deep scar in the earth' }
    ],
    [Category.FOOD]: [
      { word: 'Pizza', imposterClue: 'A circle of social experience' },
      { word: 'Sushi', imposterClue: 'Artistisk presentation av raw life' },
      { word: 'Burger', imposterClue: 'A stack of different textures' },
      { word: 'Pancakes', imposterClue: 'A flat, layered indulgence' },
      { word: 'Chocolate', imposterClue: 'A dark, melting pleasure' },
      { word: 'Pasta', imposterClue: 'Versatile forms of dough' },
      { word: 'Salad', imposterClue: 'A collection of earthy harvest' },
      { word: 'Taco', imposterClue: 'A handheld folded delight' },
      { word: 'Steak', imposterClue: 'The centerpiece of the meal' },
      { word: 'Soup', imposterClue: 'A comforting blend of liquids' },
      { word: 'Donut', imposterClue: 'A sweet void in the center' },
      { word: 'Bacon', imposterClue: 'The aroma of the morning' },
      { word: 'Popcorn', imposterClue: 'Transforming under high heat' },
      { word: 'Cheese', imposterClue: 'Patiently aged and transformed' },
      { word: 'Ice Cream', imposterClue: 'A temporary frozen joy' }
    ],
    [Category.ANIMALS]: [
      { word: 'Elephant', imposterClue: 'A creature of long memory' },
      { word: 'Giraffe', imposterClue: 'A perspective from above' },
      { word: 'Penguin', imposterClue: 'Adaptation to extreme environments' },
      { word: 'Kangaroo', imposterClue: 'Unique movement across land' },
      { word: 'Octopus', imposterClue: 'Alien intelligence in the sea' },
      { word: 'Lion', imposterClue: 'The pinnacle of the hierarchy' },
      { word: 'Shark', imposterClue: 'A perfect evolutionary hunter' },
      { word: 'Eagle', imposterClue: 'Vigilance from the heights' },
      { word: 'Snake', imposterClue: 'A silent, low-lying predator' },
      { word: 'Horse', imposterClue: 'A companion to human progress' },
      { word: 'Bee', imposterClue: 'Hard work for the collective' },
      { word: 'Owl', imposterClue: 'Wisdom hidden in darkness' },
      { word: 'Wolf', imposterClue: 'Loyalty to the group' },
      { word: 'Whale', imposterClue: 'A giant in a vast world' },
      { word: 'Spider', imposterClue: 'A weaver of intricate traps' }
    ],
    [Category.SPORTS]: [
      { word: 'Football', imposterClue: 'A contest of territorial gain' },
      { word: 'Tennis', imposterClue: 'A back-and-forth duel' },
      { word: 'Golf', imposterClue: 'A quest for precision in nature' },
      { word: 'Basketball', imposterClue: 'A game of vertical reach' },
      { word: 'Swimming', imposterClue: 'Movement through resistance' },
      { word: 'Baseball', imposterClue: 'Patient cycles of play' },
      { word: 'Boxing', imposterClue: 'The art of the direct hit' },
      { word: 'Skiing', imposterClue: 'Gliding down natural slopes' },
      { word: 'Surfing', imposterClue: 'Harnessing the power of waves' },
      { word: 'Cricket', imposterClue: 'A game of long strategy' },
      { word: 'Rugby', imposterClue: 'Rough power and teamwork' },
      { word: 'Archery', imposterClue: 'Focusing on a single point' },
      { word: 'Cycling', imposterClue: 'Human endurance on two wheels' },
      { word: 'Hockey', imposterClue: 'High-speed motion on a surface' },
      { word: 'Yoga', imposterClue: 'A balance of mind and body' }
    ],
    [Category.FANTASY]: [
      { word: 'Dragon', imposterClue: 'The ultimate hoard keeper' },
      { word: 'Wizard', imposterClue: 'Mastery over the unseen' },
      { word: 'Castle', imposterClue: 'A symbol of power and defense' },
      { word: 'Elf', imposterClue: 'Elegance and long life' },
      { word: 'Sword', imposterClue: 'A blade of destiny' },
      { word: 'Potion', imposterClue: 'Liquid magic in a bottle' },
      { word: 'Unicorn', imposterClue: 'Rarity and pure light' },
      { word: 'Vampire', imposterClue: 'A curse of eternal thirst' },
      { word: 'Werewolf', imposterClue: 'Duality within the self' },
      { word: 'Ghost', imposterClue: 'A remnant of the past' }
    ],
    [Category.JOBS]: [
      { word: 'Doctor', imposterClue: 'Healing through knowledge' },
      { word: 'Pilot', imposterClue: 'Commanding the heights' },
      { word: 'Chef', imposterClue: 'Creation through heat' },
      { word: 'Artist', imposterClue: 'Expressing the internal' },
      { word: 'Firefighter', imposterClue: 'Facing the dangerous elements' },
      { word: 'Teacher', imposterClue: 'Molding the future minds' },
      { word: 'Police', imposterClue: 'Maintaining order in chaos' },
      { word: 'Farmer', imposterClue: 'Working with the seasons' },
      { word: 'Astronaut', imposterClue: 'Leaving the world behind' },
      { word: 'Scientist', imposterClue: 'Testing the rules of nature' }
    ],
    [Category.BRANDS]: [
      { word: 'Apple', imposterClue: 'Simplicity and sleek design' },
      { word: 'Nike', imposterClue: 'Motivation to keep moving' },
      { word: 'Google', imposterClue: 'Information at your fingertips' },
      { word: 'Coca-Cola', imposterClue: 'A taste known everywhere' },
      { word: 'Starbucks', imposterClue: 'A community gathering spot' },
      { word: 'Tesla', imposterClue: 'Innovation for the future' },
      { word: 'Amazon', imposterClue: 'The world delivered to you' },
      { word: 'Netflix', imposterClue: 'Infinite stories to watch' },
      { word: 'McDonalds', imposterClue: 'Consistency and fast service' },
      { word: 'Disney', imposterClue: 'Magic for all generations' }
    ]
  },
  [Language.SV]: {
    [Category.GENERAL]: [
      { word: 'Cykel', imposterClue: 'Den förlitar sig på individuell ansträngning' },
      { word: 'TV', imposterClue: 'En källa till gemensam observation' },
      { word: 'Paraply', imposterClue: 'Används endast under specifika förhållanden' },
      { word: 'Ryggsäck', imposterClue: 'Något som rymmer din resa' },
      { word: 'Tangentbord', imposterClue: 'Ett verktyg för att skapa struktur' },
      { word: 'Ljus', imposterClue: 'Något som sakta försvinner' },
      { word: 'Teleskop', imposterClue: 'Det för det avlägsna närmare' },
      { word: 'Hammare', imposterClue: 'Ett verktyg för kraft och anslag' },
      { word: 'Spegel', imposterClue: 'Den visar vad som redan finns där' },
      { word: 'Piano', imposterClue: 'Ett komplext system av vibrationer' },
      { word: 'Klocka', imposterClue: 'En obeveklig mätenhet' },
      { word: 'Sax', imposterClue: 'Den delar det som en gång var helt' },
      { word: 'Plånbok', imposterClue: 'En väktare av personligt värde' },
      { word: 'Batteri', imposterClue: 'En behållare av dold potential' },
      { word: 'Gitarr', imposterClue: 'Den kräver manuell fingerfärdighet' },
      { word: 'Tvål', imposterClue: 'Något som sköljer bort' },
      { word: 'Kamera', imposterClue: 'Den stoppar tidens flöde' },
      { word: 'Karta', imposterClue: 'En representation av verkligheten' }
    ],
    [Category.MOVIES]: [
      { word: 'Titanic', imposterClue: 'En berättelse om oundviklig tragedi' },
      { word: 'Inception', imposterClue: 'En resa genom lager av verklighet' },
      { word: 'Hajen', imposterClue: 'Rädslan för vad som finns under ytan' },
      { word: 'Avatar', imposterClue: 'En krock mellan världar' },
      { word: 'Batman', imposterClue: 'En figur som reser sig ur mörkret' },
      { word: 'Star Wars', imposterClue: 'En gammal konflikt i en ny miljö' },
      { word: 'Harry Potter', imposterClue: 'Ett barn fött för ett öde' },
      { word: 'Toy Story', imposterClue: 'Det hemliga livet hos det livlösa' },
      { word: 'Jurassic Park', imposterClue: 'Vetenskap som överskrider sina gränser' },
      { word: 'Lejonkungen', imposterClue: 'En cirkel av liv och ledarskap' },
      { word: 'Shrek', imposterClue: 'Skönhet funnen i det ovanliga' },
      { word: 'Gladiator', imposterClue: 'En jakt på ära i dammet' },
      { word: 'The Matrix', imposterClue: 'Välja mellan sanning och komfort' },
      { word: 'Frost', imposterClue: 'Kraften i inre kyla' },
      { word: 'Spider-Man', imposterClue: 'Kraft balanserad av plikt' }
    ],
    [Category.PLACES]: [
      { word: 'Paris', imposterClue: 'En plats av kulturell betydelse' },
      { word: 'Egypten', imposterClue: 'Ett land av forntida mysterier' },
      { word: 'Tokyo', imposterClue: 'Där framtiden möter traditionen' },
      { word: 'Sydney', imposterClue: 'Ett landmärke vid havet' },
      { word: 'Hawaii', imposterClue: 'Ett paradis fött ur eld' },
      { word: 'London', imposterClue: 'En stad byggd på dimma och historia' },
      { word: 'New York', imposterClue: 'En vertikal skog av betong' },
      { word: 'Antarktis', imposterClue: 'Världens ände' },
      { word: 'Sahara', imposterClue: 'Ett vidsträckt, oförlåtande landskap' },
      { word: 'Mars', imposterClue: 'Mänsklighetens nästa gräns' },
      { word: 'Mount Everest', imposterClue: 'Den ultimata fysiska utmaningen' },
      { word: 'Kinesiska muren', imposterClue: 'En gräns gjord av sten' },
      { word: 'Venedig', imposterClue: 'En plats som sakta återtas' },
      { word: 'Hollywood', imposterClue: 'En fabrik för moderna myter' },
      { word: 'Grand Canyon', imposterClue: 'Ett djupt ärr i jorden' }
    ],
    [Category.FOOD]: [
      { word: 'Pizza', imposterClue: 'En cirkel av social erfarenhet' },
      { word: 'Sushi', imposterClue: 'Artistisk presentation av rått liv' },
      { word: 'Burgare', imposterClue: 'En stapel av olika texturer' },
      { word: 'Pannkakor', imposterClue: 'En platt, lager-på-lager njutning' },
      { word: 'Choklad', imposterClue: 'En mörk, smältande njutning' },
      { word: 'Pasta', imposterClue: 'Mångsidiga former av deg' },
      { word: 'Sallad', imposterClue: 'En samling jordig skörd' },
      { word: 'Taco', imposterClue: 'En handhållen vikt läckerhet' },
      { word: 'Stek', imposterClue: 'Måltidens medelpunkt' },
      { word: 'Soppa', imposterClue: 'En tröstande blandning av vätskor' },
      { word: 'Munk', imposterClue: 'Ett sött tomrum i mitten' },
      { word: 'Bacon', imposterClue: 'Morgonens doft' },
      { word: 'Popcorn', imposterClue: 'Förvandlas under hög värme' },
      { word: 'Ost', imposterClue: 'Tålmodigt lagrad och förvandlad' },
      { word: 'Glass', imposterClue: 'En tillfällig frusen glädje' }
    ],
    [Category.ANIMALS]: [
      { word: 'Elefant', imposterClue: 'En varelse med långt minne' },
      { word: 'Giraff', imposterClue: 'Ett perspektiv ovanifrån' },
      { word: 'Pingvin', imposterClue: 'Anpassning till extrema miljöer' },
      { word: 'Känguru', imposterClue: 'Unik rörelse över land' },
      { word: 'Bläckfisk', imposterClue: 'Utomjordisk intelligens i havet' },
      { word: 'Lejon', imposterClue: 'Hierarkins höjdpunkt' },
      { word: 'Haj', imposterClue: 'En perfekt evolutionär jägare' },
      { word: 'Örn', imposterClue: 'Vaksamhet från höjderna' },
      { word: 'Orm', imposterClue: 'Ett tyst, låglänt rovdjur' },
      { word: 'Häst', imposterClue: 'En följeslagare till mänskliga framsteg' },
      { word: 'Bi', imposterClue: 'Hårt arbete för kollektivet' },
      { word: 'Uggla', imposterClue: 'Visdom dold i mörkret' },
      { word: 'Varg', imposterClue: 'Lojalitet mot gruppen' },
      { word: 'Val', imposterClue: 'En jätte i en vidsträckt värld' },
      { word: 'Spindel', imposterClue: 'En vävare av intrikata fällor' }
    ],
    [Category.SPORTS]: [
      { word: 'Fotboll', imposterClue: 'En tävling om territoriell vinst' },
      { word: 'Tennis', imposterClue: 'En fram-och-tillbaka duell' },
      { word: 'Golf', imposterClue: 'En jakt på precision i naturen' },
      { word: 'Basket', imposterClue: 'Ett spel med vertikal räckvidd' },
      { word: 'Simning', imposterClue: 'Rörelse genom motstånd' },
      { word: 'Baseboll', imposterClue: 'Tålmodiga cykler av spel' },
      { word: 'Boxning', imposterClue: 'Konsten att få en direktträff' },
      { word: 'Skidåkning', imposterClue: 'Glida nerför naturliga sluttningar' },
      { word: 'Surfing', imposterClue: 'Tämja vågornas kraft' },
      { word: 'Cricket', imposterClue: 'Ett spel av lång strategi' },
      { word: 'Rugby', imposterClue: 'Rå kraft och lagarbete' },
      { word: 'Bågskytte', imposterClue: 'Fokusera på en enda punkt' },
      { word: 'Cykling', imposterClue: 'Mänsklig uthållighet på två hjul' },
      { word: 'Is hockey', imposterClue: 'Höghastighetsrörelse på en yta' },
      { word: 'Yoga', imposterClue: 'En balans mellan kropp och sinne' }
    ],
    [Category.FANTASY]: [
      { word: 'Drake', imposterClue: 'Den ultimata skattväktaren' },
      { word: 'Trollkarl', imposterClue: 'Mästerskap över det osedda' },
      { word: 'Slott', imposterClue: 'En symbol för makt och försvar' },
      { word: 'Alv', imposterClue: 'Elegans och långt liv' },
      { word: 'Svärd', imposterClue: 'Ett ödets klinga' },
      { word: 'Trolldryck', imposterClue: 'Flytande magi i en flaska' },
      { word: 'Enhörning', imposterClue: 'Sällsynthet och rent ljus' },
      { word: 'Vampyr', imposterClue: 'En förbannelse av evig törst' },
      { word: 'Varulv', imposterClue: 'Dualitet inom jaget' },
      { word: 'Spöke', imposterClue: 'En rest från det förflutna' }
    ],
    [Category.JOBS]: [
      { word: 'Läkare', imposterClue: 'Läkning genom kunskap' },
      { word: 'Pilot', imposterClue: 'Befäl över höjderna' },
      { word: 'Kock', imposterClue: 'Skapande genom värme' },
      { word: 'Konstnär', imposterClue: 'Uttrycka det inre' },
      { word: 'Brandman', imposterClue: 'Möta de farliga elementen' },
      { word: 'Lärare', imposterClue: 'Forma framtidens sinnen' },
      { word: 'Polis', imposterClue: 'Upprätthålla ordning i kaos' },
      { word: 'Bonde', imposterClue: 'Arbeta med årstiderna' },
      { word: 'Astronaut', imposterClue: 'Lämna världen bakom sig' },
      { word: 'Forskare', imposterClue: 'Testa naturens regler' }
    ],
    [Category.BRANDS]: [
      { word: 'Apple', imposterClue: 'Enkelhet och elegant design' },
      { word: 'Nike', imposterClue: 'Motivation att fortsätta röra sig' },
      { word: 'Google', imposterClue: 'Information vid dina fingertoppar' },
      { word: 'Coca-Cola', imposterClue: 'En smak känd överallt' },
      { word: 'Starbucks', imposterClue: 'En samlingsplats för samhället' },
      { word: 'Tesla', imposterClue: 'Innovation för framtiden' },
      { word: 'Amazon', imposterClue: 'Världen levererad till dig' },
      { word: 'Netflix', imposterClue: 'Oändliga historier att titta på' },
      { word: 'McDonalds', imposterClue: 'Konsekvens och snabb service' },
      { word: 'Disney', imposterClue: 'Magi för alla generationer' }
    ]
  }
};

export const UI_STRINGS: Record<Language, any> = {
  [Language.EN]: {
    game_title: 'Imposter',
    sub_title: 'Social Deduction Game',
    play_game: 'Play Game',
    how_to: 'How to Play',
    setup_title: 'Game Setup',
    players: 'Players',
    difficulty: 'Difficulty Tweak',
    imposter_hints: 'Imposter Hints',
    hints_on: 'Imposter gets an abstract clue',
    hints_off: 'Imposter sees nothing (Hard Mode)',
    category: 'Category',
    start_game: 'Start Game',
    how_step1_title: '1. Role Reveal',
    how_step1_desc: 'Pass the phone. Everyone sees the secret word except the Imposter. Depending on settings, the Imposter may get a vague clue.',
    how_step2_title: '2. Give Clues',
    how_step2_desc: "In real life, take turns giving clues. Try to be subtle! If you're too obvious, the Imposter will blend right in.",
    how_step3_title: '3. Find the Imposter',
    how_step3_desc: 'Discuss and vote in person. When ready, reveal the true Imposter in the app!',
    player_label: 'Player',
    role_reveal_prompt: "It's your turn to see your role. Make sure no one else is looking!",
    tap_to_reveal: 'Tap to Reveal',
    you_are: 'You Are...',
    imposter: 'Imposter',
    abstract_clue: 'Abstract Clue',
    hard_mode_active: 'Hard Mode Active',
    hard_mode_desc: 'You have no clue. Listen to others to blend in!',
    secret_word: 'Secret Word',
    describe_carefully: 'Describe it carefully!',
    start_clue_round: 'Start Clue Round',
    hide_pass: 'Hide & Pass Phone',
    discussion_title: 'Discussion',
    first_to_clue: 'First to Clue',
    discussion_desc: "Take turns giving clues starting from Player {id}. Don't be too obvious—the Imposter is trying to blend in!",
    reveal_results: 'Reveal Results',
    secret_out: 'The Secret is Out!',
    imposter_identified: 'Was the Imposter correctly identified?',
    imposter_was: 'The Imposter Was',
    play_again: 'Play Again',
    main_menu: 'Main Menu',
    language: 'Language',
    reroll_word: 'Reroll Word',
    restart_round: 'Restart Round',
    category_names: {
      [Category.ALL]: 'All',
      [Category.GENERAL]: 'General',
      [Category.MOVIES]: 'Movies',
      [Category.PLACES]: 'Places',
      [Category.FOOD]: 'Food',
      [Category.ANIMALS]: 'Animals',
      [Category.SPORTS]: 'Sports',
      [Category.FANTASY]: 'Fantasy',
      [Category.JOBS]: 'Jobs',
      [Category.BRANDS]: 'Brands'
    }
  },
  [Language.SV]: {
    game_title: 'Imposter',
    sub_title: 'Socialt Detektivspel',
    play_game: 'Spela Nu',
    how_to: 'Hur man spelar',
    setup_title: 'Inställningar',
    players: 'Spelare',
    difficulty: 'Svårighetsgrad',
    imposter_hints: 'Ledtrådar för Imposter',
    hints_on: 'Imposter får en abstrakt ledtråd',
    hints_off: 'Imposter ser ingenting (Svårt läge)',
    category: 'Kategori',
    start_game: 'Starta Spelet',
    how_step1_title: '1. Rollavslöjande',
    how_step1_desc: 'Skicka runt mobilen. Alla ser det hemliga ordet utom Impostern. Beroende på inställningar kan Impostern få en vag ledtråd.',
    how_step2_title: '2. Ge Ledtrådar',
    how_step2_desc: 'I verkligheten turas ni om att ge ledtrådar. Var subtil! Om du är för tydlig kommer Impostern smälta in direkt.',
    how_step3_title: '3. Hitta Impostern',
    how_step3_desc: 'Diskutera och rösta ansikte mot ansikte. När ni är redo, avslöja vem som var Imposter i appen!',
    player_label: 'Spelare',
    role_reveal_prompt: 'Det är din tur att se din roll. Se till att ingen annan tittar!',
    tap_to_reveal: 'Tryck för att se',
    you_are: 'Du är...',
    imposter: 'Imposter',
    abstract_clue: 'Abstrakt ledtråd',
    hard_mode_active: 'Svårt läge aktivt',
    hard_mode_desc: 'Du har ingen aning. Lyssna på de andra för att smälta in!',
    secret_word: 'Hemligt ord',
    describe_carefully: 'Beskriv det försiktigt!',
    start_clue_round: 'Starta rundan',
    hide_pass: 'Dölj & skicka vidare',
    discussion_title: 'Diskussion',
    first_to_clue: 'Börjar ge ledtråd',
    discussion_desc: 'Turas om att ge ledtrådar med start från Spelare {id}. Var inte för tydlig — Impostern försöker smälta in!',
    reveal_results: 'Visa resultat',
    secret_out: 'Hemligheten är ute!',
    imposter_identified: 'Hittade ni rätt Imposter?',
    imposter_was: 'Impostern var',
    play_again: 'Spela igen',
    main_menu: 'Huvudmeny',
    language: 'Språk',
    reroll_word: 'Nytt ord',
    restart_round: 'Börja om rundan',
    category_names: {
      [Category.ALL]: 'Alla',
      [Category.GENERAL]: 'Allmänt',
      [Category.MOVIES]: 'Filmer',
      [Category.PLACES]: 'Platser',
      [Category.FOOD]: 'Mat',
      [Category.ANIMALS]: 'Djur',
      [Category.SPORTS]: 'Sport',
      [Category.FANTASY]: 'Fantasi',
      [Category.JOBS]: 'Yrken',
      [Category.BRANDS]: 'Märken'
    }
  }
};

export const UI_ICONS = {
  Home: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  User: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  AlertCircle: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  Check: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Refresh: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 21h5v-5" />
    </svg>
  ),
};
