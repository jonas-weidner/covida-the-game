export enum Region {
  Black = "BLACK",
  Red = "RED",
  Blue = "BLUE",
  Yellow = "YELLOW"
}

export enum PlayingCardType {
  City = "CITY",
  Action = "ACTION",
  Pandemic = "PANDEMIC"
}

export interface PlayingCard {
  type: PlayingCardType;
  city?: CityCard;
  action?: ActionCard;
}

export interface ActionCard {
  name: string;
  description?: string;
}

export interface CityCard {
  city: string;
  country: string;
  region: Region;
  population: number;
}

export interface Game {
    gameCode: string;
    numberOfPlayers: number;
    difficulty: number;
    players: Player[];
    finished: boolean;
    started: boolean;
    playerDeck: PlayingCard[];
    playerDiscardPile: PlayingCard[];
    infectionDeck: CityCard[];
    infectionDiscardPile: CityCard[];
    infectionRate: number;
    outbreaks: number;
    cities: City[];
    curedDiseases: {
        yellow: boolean;
        red: boolean;
        black: boolean;
        blue: boolean;
    };
}

export interface Player {
    id: string;
    name: string;
    role?: Role;
    playingCards: PlayingCard[];
    activeTurn: boolean;
}

export interface Role {
    name: string;
    actions: string[];
    notes?: string;
}

export interface City {
    city: string;
    region: Region;
    researchStation: boolean;
    diseaseCubes: number;
    playersInCity: Player[];
}
