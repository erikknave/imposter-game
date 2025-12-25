
export enum Language {
  EN = 'en',
  SV = 'sv'
}

export enum GameScreen {
  HOME = 'HOME',
  SETUP = 'SETUP',
  HOW_TO_PLAY = 'HOW_TO_PLAY',
  REVEAL = 'REVEAL',
  DISCUSSION = 'DISCUSSION',
  RESULTS = 'RESULTS'
}

export enum Category {
  ALL = 'All',
  GENERAL = 'General',
  MOVIES = 'Movies',
  PLACES = 'Places',
  FOOD = 'Food',
  ANIMALS = 'Animals',
  SPORTS = 'Sports',
  FANTASY = 'Fantasy',
  JOBS = 'Jobs',
  BRANDS = 'Brands'
}

export interface GameSettings {
  playerCount: number;
  category: Category;
  showImposterHints: boolean;
  language: Language;
}

export interface Player {
  id: number;
  name: string;
  role: 'INNOCENT' | 'IMPOSTER';
}

export interface WordEntry {
  word: string;
  imposterClue: string;
}

export interface GameState {
  screen: GameScreen;
  settings: GameSettings;
  players: Player[];
  secretWord: string;
  imposterClue: string;
  imposterId: number;
  startingPlayerId: number;
  currentTurnIndex: number; 
  usedWords: Record<string, string[]>;
  roundId: number;
}
