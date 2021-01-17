import { PlayingCard, PlayingCardType, Region } from "@/types";

export const playingCards: PlayingCard[] = [
    {
        type: PlayingCardType.Action,
        action: {
            name: "Zähe Bevölkerung",
            description: "Entferne eine Karte vom" +
            " Infektionsablegestapel aus dem Spiel."
        }
    },
    {
        type: PlayingCardType.Action,
        action: {
            name: "Eine ruhige Nacht",
            description: "Die nächste Infektionsphase (egal welcher Spieler dann am Zug ist)" +
              " wird komplett übersprungen."
        }
    },
    {
        type: PlayingCardType.Action,
        action: {
            name: "Prognose",
            description: "Ziehe die nächsten 6 Karten des Infektionsstapels. Schaue dir die" +
              " Karten an und lege sie in beliebiger Reihenfolge zurück auf den Stapel."
        }
    },
    {
        type: PlayingCardType.Action,
        action: {
            name: "Statliche Subvention",
            description: "Setze eine Forschungsstation in eine beliebige Stadt (keine Stadtkarte" +
              " nötig."
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
            city: "Riad",
            country: "Saudi-Arabien",
            region: Region.Black,
            population: 6506700
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
            city: "Hongkong",
            country: "China",
            region: Region.Red,
            population: 7409800
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
            city: "Madrid",
            country: "Spanien",
            region: Region.Blue,
            population: 6529700
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
            city: "Istanbul",
            country: "Türkei",
            region: Region.Black,
            population: 14741000
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
            city: "Khartum",
            country: "Sudan",
            region: Region.Yellow,
            population: 5274321
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
            city: "Lima",
            country: "Peru",
            region: Region.Yellow,
            population: 12140000
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
            city: "Santiago",
            country: "Chile",
            region: Region.Yellow,
            population: 7036792
        }
    },
    {
        type: PlayingCardType.City,
        city: {
            city: "Bangkok",
            country: "Thailand",
            region: Region.Red,
            population: 14626225
        }
    },
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
            city: "Kinshasa",
            country: "Kongo",
            region: Region.Yellow,
            population: 11855000
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
            city: "Teheran",
            country: "Iran",
            region: Region.Black,
            population: 8846782
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
            city: "Johannesburg",
            country: "Südafrika",
            region: Region.Yellow,
            population: 9616000
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
            city: "New York",
            country: "USA",
            region: Region.Blue,
            population: 23723696
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
            city: "Montreal",
            country: "Kanada",
            region: Region.Blue,
            population: 3519595
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
            city: "London",
            country: "Großbritannien",
            region: Region.Blue,
            population: 13709000
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
            city: "Mumbai",
            country: "Indien",
            region: Region.Black,
            population: 18414288
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
            city: "Moskau",
            country: "Russland",
            region: Region.Blue,
            population: 16170000
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
            city: "Sydney",
            country: "Australien",
            region: Region.Red,
            population: 5029711
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
            city: "Osaka",
            country: "Japan",
            region: Region.Red,
            population: 19341976
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
            city: "Ho Chi Minh Stadt",
            country: "Vietnam",
            region: Region.Red,
            population: 13000000
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
            city: "Delhi",
            country: "Indien",
            region: Region.Black,
            population: 26454000
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
            city: "Essen",
            country: "Deutschland",
            region: Region.Blue,
            population: 583084
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
    }
];
