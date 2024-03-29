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

export enum DiseaseState {
    NotFound = "NOTFOUND",
    Found = "FOUND",
    Cured = "CURED"
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
    id?: string;
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
    diseaseStates: DiseaseStates;
    lastGameStates: Game[];
}

export interface DiseaseStates {
    yellow: DiseaseState;
    red: DiseaseState;
    black: DiseaseState;
    blue: DiseaseState;
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
    color: string;
}

export interface City {
    city: string;
    region: Region;
    researchStation: boolean;
    diseaseCubes: {
        yellow: number;
        red: number;
        black: number;
        blue: number;
    };
    playersInCity: Player[];
    labelPosition: "top"|"bottom"|"right"|"left";
    location: {
        top: number;
        left: number;
    };
}

export interface AutoCompleteObject {
    label: string;
    value: string;
}
