/* eslint-disable */
import { PlayingCardType, Region } from "@/types";

export const emptyMockGame: any = {
    gameCode: "anacrustic-outvaluing",
    numberOfPlayers: 4,
    difficulty: 4,
    players: [
        {
            id: "player1",
            name: "Player 1",
            playingCards: [],
            activeTurn: false
        },
        {
            id: "player2",
            name: "Player 2",
            playingCards: [],
            activeTurn: false
        },
        {
            id: "player3",
            name: "Player 3",
            playingCards: [],
            activeTurn: false
        },
        {
            id: "player4",
            name: "Player 4",
            playingCards: [],
            activeTurn: false
        }
    ],
    finished: false,
    playerDeck: [],
    playerDiscardPile: [],
    infectionDeck: [],
    infectionDiscardPile: [],
    infectionRate: 1,
    outbreaks: 0,
    curedDiseases: {
        yellow: false,
        red: false,
        black: false,
        blue: false
    },
    cities: []
};

export const fullMockGame = {
    infectionRate: 1,
    finished: false,
    curedDiseases: {
        blue: false,
        black: false,
        yellow: false,
        red: false
    },
    playerDiscardPile: [],
    numberOfPlayers: 2,
    gameCode: "horngeld-conjured",
    infectionDeck: [
        {
            city: "Riad",
            country: "Saudi-Arabien",
            region: Region.Black,
            population: 6506700
        },
        {
            city: "Seoul",
            country: "Südkorea",
            region: Region.Red,
            population: 25600000
        },
        {
            city: "Honkong",
            country: "China",
            region: Region.Red,
            population: 7409800
        },
        {
            city: "Mailand",
            country: "Italien",
            region: Region.Blue,
            population: 5270000
        },
        {
            city: "Madrid",
            country: "Spanien",
            region: Region.Blue,
            population: 6529700
        },
        {
            city: "Taipei",
            country: "Taiwan",
            region: Region.Red,
            population: 7047559
        },
        {
            city: "Istanbul",
            country: "Türkei",
            region: Region.Black,
            population: 14741000
        },
        {
            city: "Mexiko Stadt",
            country: "Mexiko",
            region: Region.Yellow,
            population: 21157000
        },
        {
            city: "Khartum",
            country: "Sudan",
            region: Region.Yellow,
            population: 5274321
        },
        {
            city: "Peking",
            country: "China",
            region: Region.Red,
            population: 24000000
        },
        {
            city: "Sao Paolo",
            country: "Brasilien",
            region: Region.Yellow,
            population: 23455256
        },
        {
            city: "Lima",
            country: "Peru",
            region: Region.Yellow,
            population: 12140000
        },
        {
            city: "Tokio",
            country: "Japan",
            region: Region.Red,
            population: 38305000
        },
        {
            city: "Santiago",
            country: "Chile",
            region: Region.Yellow,
            population: 7036792
        },
        {
            city: "Bankok",
            country: "Thailand",
            region: Region.Red,
            population: 14626225
        },
        {
            city: "Los Angeles",
            country: "USA",
            region: Region.Yellow,
            population: 13131431
        },
        {
            city: "Buenos Aires",
            country: "Argentinien",
            region: Region.Yellow,
            population: 13591863
        },
        {
            city: "Kinshasa",
            country: "Kongo",
            region: Region.Yellow,
            population: 11855000
        },
        {
            city: "Lagos",
            country: "Nigeria",
            region: Region.Yellow,
            population: 21000000
        },
        {
            city: "Paris",
            country: "Frankreich",
            region: Region.Blue,
            population: 12405426
        },
        {
            city: "Teheran",
            country: "Iran",
            region: Region.Black,
            population: 8846782
        },
        {
            city: "Miami",
            country: "USA",
            region: Region.Yellow,
            population: 5564635
        },
        {
            city: "Johannesburg",
            country: "Südafrika",
            region: Region.Yellow,
            population: 9616000
        },
        {
            city: "Karachi",
            country: "Pakistan",
            region: Region.Black,
            population: 23000000
        },
        {
            city: "Washington",
            country: "USA",
            region: Region.Blue,
            population: 4586770
        },
        {
            city: "New York",
            country: "USA",
            region: Region.Blue,
            population: 23723696
        },
        {
            city: "San Francisco",
            country: "USA",
            region: Region.Blue,
            population: 4727357
        },
        {
            city: "Montreal",
            country: "Kanada",
            region: Region.Blue,
            population: 3519595
        },
        {
            city: "St. Petersburg",
            country: "Russland",
            region: Region.Blue,
            population: 5281579
        },
        {
            city: "London",
            country: "Großbritannien",
            region: Region.Blue,
            population: 13709000
        },
        {
            city: "Kalkutta",
            country: "Indien",
            region: Region.Black,
            population: 14617882
        },
        {
            city: "Madras",
            country: "Indien",
            region: Region.Black,
            population: 10265000
        },
        {
            city: "Mumbai",
            country: "Indien",
            region: Region.Black,
            population: 18414288
        },
        {
            city: "Bagdad",
            country: "Irak",
            region: Region.Black,
            population: 8765000
        },
        {
            city: "Bogota",
            country: "Kolumbien",
            region: Region.Yellow,
            population: 10200000
        },
        {
            city: "Moskau",
            country: "Russland",
            region: Region.Black,
            population: 16170000
        },
        {
            city: "Shanghai",
            country: "China",
            region: Region.Red,
            population: 35965403
        },
        {
            city: "Sydney",
            country: "Australien",
            region: Region.Red,
            population: 5029711
        },
        {
            city: "Jakarta",
            country: "Indonesien",
            region: Region.Red,
            population: 30214303
        },
        {
            city: "Algier",
            country: "Algerien",
            region: Region.Black,
            population: 7796923
        },
        {
            city: "Osaka",
            country: "Japan",
            region: Region.Red,
            population: 19341976
        },
        {
            city: "Atlanta",
            country: "USA",
            region: Region.Blue,
            population: 4975300
        },
        {
            city: "Ho Chi Minh Stadt",
            country: "Vietnam",
            region: Region.Red,
            population: 13000000
        },
        {
            city: "Manila",
            country: "Philippinen",
            region: Region.Red,
            population: 12877253
        },
        {
            city: "Delhi",
            country: "Indien",
            region: Region.Black,
            population: 26454000
        },
        {
            city: "Chicago",
            country: "USA",
            region: Region.Blue,
            population: 9512999
        },
        {
            city: "Essen",
            country: "Deutschland",
            region: Region.Blue,
            population: 583084
        },
        {
            city: "Kairo",
            country: "Ägypten",
            region: Region.Black,
            population: 20439541
        }
    ],
    outbreaks: 0,
    playerDeck: [
        {
            type: PlayingCardType.City,
            city: {
                city: "Delhi",
                country: "Indien",
                region: Region.Black,
                population: 26454000
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Tokio",
                country: "Japan",
                region: Region.Red,
                population: 38305000
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Kalkutta",
                country: "Indien",
                region: Region.Black,
                population: 14617882
            }
        },
        {
            type: PlayingCardType.Action,
            action: {
                name: "Freiflug",
                description: "Bewege eine beliebige Spielfigur in eine bleibige andere Stadt."
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "New York",
                country: "USA",
                region: Region.Blue,
                population: 23723696
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Mumbai",
                country: "Indien",
                region: Region.Black,
                population: 18414288
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Sydney",
                country: "Australien",
                region: Region.Red,
                population: 5029711
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Riad",
                country: "Saudi-Arabien",
                region: Region.Black,
                population: 6506700
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Lagos",
                country: "Nigeria",
                region: Region.Yellow,
                population: 21000000
            }
        },
        {
            type: PlayingCardType.Action,
            action: {
                name: "Eine ruhige Nacht",
                description: "Die nächste Infektionsphase (egal welcher Spieler dann am Zug ist) wird komplett übersprungen."
            }
        },
        { type: PlayingCardType.Pandemic },
        {
            type: PlayingCardType.City,
            city: {
                city: "Johannesburg",
                country: "Südafrika",
                region: Region.Yellow,
                population: 9616000
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Santiago",
                country: "Chile",
                region: Region.Yellow,
                population: 7036792
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Honkong",
                country: "China",
                region: Region.Red,
                population: 7409800
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Montreal",
                country: "Kanada",
                region: Region.Blue,
                population: 3519595
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Kairo",
                country: "Ägypten",
                region: Region.Black,
                population: 20439541
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Seoul",
                country: "Südkorea",
                region: Region.Red,
                population: 25600000
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Sao Paolo",
                country: "Brasilien",
                region: Region.Yellow,
                population: 23455256
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Karachi",
                country: "Pakistan",
                region: Region.Black,
                population: 23000000
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Washington",
                country: "USA",
                region: Region.Blue,
                population: 4586770
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Bankok",
                country: "Thailand",
                region: Region.Red,
                population: 14626225
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Taipei",
                country: "Taiwan",
                region: Region.Red,
                population: 7047559
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Jakarta",
                country: "Indonesien",
                region: Region.Red,
                population: 30214303
            }
        },
        {
            type: PlayingCardType.Action,
            action: {
                name: "Prognose",
                description: "Ziehe die nächsten 6 Karten des Infektionsstapels. Schaue dir die Karten an und lege sie in beliebiger Reihenfolge zurück auf den Stapel."
            }
        },
        {
            type: PlayingCardType.Action,
            action: {
                name: "Statliche Subvention",
                description: "Setze eine Forschungsstation in eine beliebige Stadt (keine Stadtkarte nötig."
            }
        },
        { type: PlayingCardType.Pandemic },
        {
            type: PlayingCardType.City,
            city: {
                city: "Los Angeles",
                country: "USA",
                region: Region.Yellow,
                population: 13131431
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Buenos Aires",
                country: "Argentinien",
                region: Region.Yellow,
                population: 13591863
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Shanghai",
                country: "China",
                region: Region.Red,
                population: 35965403
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Mailand",
                country: "Italien",
                region: Region.Blue,
                population: 5270000
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Chicago",
                country: "USA",
                region: Region.Blue,
                population: 9512999
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Madras",
                country: "Indien",
                region: Region.Black,
                population: 10265000
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Bogota",
                country: "Kolumbien",
                region: Region.Yellow,
                population: 10200000
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Manila",
                country: "Philippinen",
                region: Region.Red,
                population: 12877253
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Ho Chi Minh Stadt",
                country: "Vietnam",
                region: Region.Red,
                population: 13000000
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Istanbul",
                country: "Türkei",
                region: Region.Black,
                population: 14741000
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Atlanta",
                country: "USA",
                region: Region.Blue,
                population: 4975300
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Mexiko Stadt",
                country: "Mexiko",
                region: Region.Yellow,
                population: 21157000
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "St. Petersburg",
                country: "Russland",
                region: Region.Blue,
                population: 5281579
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Essen",
                country: "Deutschland",
                region: Region.Blue,
                population: 583084
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Lima",
                country: "Peru",
                region: Region.Yellow,
                population: 12140000
            }
        },
        {
            type: PlayingCardType.Action,
            action: {
                name: "Zähe Bevölkerung",
                description: "Entferne eine Karte vom Infektionsablegestapel aus dem Spiel."
            }
        },
        { type: PlayingCardType.Pandemic },
        {
            type: PlayingCardType.City,
            city: {
                city: "Teheran",
                country: "Iran",
                region: Region.Black,
                population: 8846782
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Algier",
                country: "Algerien",
                region: Region.Black,
                population: 7796923
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Miami",
                country: "USA",
                region: Region.Yellow,
                population: 5564635
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Paris",
                country: "Frankreich",
                region: Region.Blue,
                population: 12405426
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Peking",
                country: "China",
                region: Region.Red,
                population: 24000000
            }
        },
        { type: PlayingCardType.Pandemic },
        {
            type: PlayingCardType.City,
            city: {
                city: "Moskau",
                country: "Russland",
                region: Region.Black,
                population: 16170000
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "London",
                country: "Großbritannien",
                region: Region.Blue,
                population: 13709000
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Madrid",
                country: "Spanien",
                region: Region.Blue,
                population: 6529700
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "San Francisco",
                country: "USA",
                region: Region.Blue,
                population: 4727357
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Khartum",
                country: "Sudan",
                region: Region.Yellow,
                population: 5274321
            }
        },
        {
            type: PlayingCardType.City,
            city: {
                city: "Osaka",
                country: "Japan",
                region: Region.Red,
                population: 19341976
            }
        }
    ],
    difficulty: 4,
    cities: [
        {
            city: "Riad",
            region: Region.Black,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Seoul",
            region: Region.Red,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Honkong",
            region: Region.Red,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Mailand",
            region: Region.Blue,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Madrid",
            region: Region.Blue,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Taipei",
            region: Region.Red,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Istanbul",
            region: Region.Black,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Mexiko Stadt",
            region: Region.Yellow,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Khartum",
            region: Region.Yellow,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Peking",
            region: Region.Red,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Sao Paolo",
            region: Region.Yellow,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Lima",
            region: Region.Yellow,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Tokio",
            region: Region.Red,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Santiago",
            region: Region.Yellow,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Bankok",
            region: Region.Red,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Los Angeles",
            region: Region.Yellow,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Buenos Aires",
            region: Region.Yellow,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Kinshasa",
            region: Region.Yellow,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Lagos",
            region: Region.Yellow,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Paris",
            region: Region.Blue,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Teheran",
            region: Region.Black,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Miami",
            region: Region.Yellow,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Johannesburg",
            region: Region.Yellow,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Karachi",
            region: Region.Black,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Washington",
            region: Region.Blue,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "New York",
            region: Region.Blue,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "San Francisco",
            region: Region.Blue,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Montreal",
            region: Region.Blue,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "St. Petersburg",
            region: Region.Blue,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "London",
            region: Region.Blue,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Kalkutta",
            region: Region.Black,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Madras",
            region: Region.Black,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Mumbai",
            region: Region.Black,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Bagdad",
            region: Region.Black,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Bogota",
            region: Region.Yellow,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Moskau",
            region: Region.Black,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Shanghai",
            region: Region.Red,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Sydney",
            region: Region.Red,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Jakarta",
            region: Region.Red,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Algier",
            region: Region.Black,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Osaka",
            region: Region.Red,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Atlanta",
            region: Region.Blue,
            researchStation: true,
            diseaseCubes: 0,
            playersInCity: [
                {
                    id: "0SFLGZQB4VUrqlP0VZxB4TBSNop2",
                    name: "Jonas",
                    role: {
                        name: "Forscherin",
                        actions: [
                            "Die Forscherin darf bei der Aktion „Wissen teilen“ Folgendes\ntun: Anstelle der zur Stadt passenden Karte, darf sie einem\nMitspieler, der mit ihr in einer Stadt steht, eine beliebige\nStadtkarte geben (aber nicht erhalten!). Das gilt auch, wenn\nder Mitspieler die Aktion am gemeinsamen Standort auslöst."
                        ]
                    },
                    activeTurn: false,
                    playingCards: [
                        {
                            type: PlayingCardType.City,
                            city: {
                                city: "Kinshasa",
                                country: "Kongo",
                                region: Region.Yellow,
                                population: 11855000
                            }
                        },
                        {
                            type: PlayingCardType.City,
                            city: {
                                city: "Bagdad",
                                country: "Irak",
                                region: Region.Black,
                                population: 8765000
                            }
                        }
                    ]
                }
            ]
        },
        {
            city: "Ho Chi Minh Stadt",
            region: Region.Red,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Manila",
            region: Region.Red,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Delhi",
            region: Region.Black,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Chicago",
            region: Region.Blue,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Essen",
            region: Region.Blue,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        },
        {
            city: "Kairo",
            region: Region.Black,
            researchStation: false,
            diseaseCubes: 0,
            playersInCity: []
        }
    ],
    infectionDiscardPile: [],
    players: [
        {
            activeTurn: false,
            playingCards: [
                {
                    city: {
                        city: "Kinshasa",
                        population: 11855000,
                        region: Region.Yellow,
                        country: "Kongo"
                    },
                    type: PlayingCardType.City
                },
                {
                    type: PlayingCardType.City,
                    city: {
                        population: 8765000,
                        country: "Irak",
                        region: Region.Black,
                        city: "Bagdad"
                    }
                }
            ],
            id: "0SFLGZQB4VUrqlP0VZxB4TBSNop2",
            role: {
                name: "Forscherin",
                actions: [
                    "Die Forscherin darf bei der Aktion „Wissen teilen“ Folgendes\ntun: Anstelle der zur Stadt passenden Karte, darf sie einem\nMitspieler, der mit ihr in einer Stadt steht, eine beliebige\nStadtkarte geben (aber nicht erhalten!). Das gilt auch, wenn\nder Mitspieler die Aktion am gemeinsamen Standort auslöst."
                ]
            },
            name: "Jonas"
        }
    ]
};
