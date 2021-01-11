<template>
    <div>
        <c-button variant-color="blue" size="md" @click="startGame">
            Spiel starten
        </c-button>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import { playingCards } from "@/assets/playingCards";
import { shuffleCards } from "@/services/gameActions";
import { City, CityCard, Game, Player, PlayingCard, PlayingCardType } from "@/types";
import random from "random";
import {
    initializeCities,
    initializeInfectionDeck,
    initializeInfectionDiscardPile,
    setPlayerDeck, startGame,
    updateAllPlayers
} from "@/services/firebase";
import { roles } from "@/assets/roles";
import { cities } from "@/assets/cities";
import { infectionCards } from "@/assets/infectionCards";

export default Vue.extend({
    props: { game: { required: true } },
    computed: {
        typedGame(): Game {
            return this.game as Game;
        }
    },
    methods: {
        async startGame() {
            const assigned = await this
                .assignRoleAndCardsToPlayers(shuffleCards([...playingCards]));
            const deckWithPandemics = this.addPandemicCardsToDeck(assigned.deck);
            const newCities = this.initializeCities(assigned.players);
            const decks = this.initializeInfectionDeck(newCities);
            await Promise.all([
                setPlayerDeck(deckWithPandemics),
                initializeCities(decks.cities),
                initializeInfectionDeck(decks.infectionDeck),
                initializeInfectionDiscardPile(decks.infectionDiscardPile),
                startGame()
            ]);
        },
        initializeCities(players: Player[]): City[] {
            const newCities = [...cities];
            const atlantaIndex = newCities.findIndex((city) => city.city === "Atlanta");
            newCities[atlantaIndex].researchStation = true;
            newCities[atlantaIndex].playersInCity = players;
            return newCities;
        },
        initializeInfectionDeck(newCities: City[]): { infectionDeck: CityCard[];
            infectionDiscardPile: CityCard[]; cities: City[];
        } {
            const infectionDeck = shuffleCards([...infectionCards]) as CityCard[];
            let infectionDiscardPile: CityCard[] = [];
            for (let index = 3; index > 0; index--) {
                const threeCards = infectionDeck.splice(0, 3);
                infectionDiscardPile = [...infectionDiscardPile, ...threeCards];
                for (const card of threeCards) {
                    const cityIndex = newCities.findIndex((city) => city.city === card.city);
                    newCities[cityIndex].diseaseCubes = index;
                }
            }

            return {
                infectionDeck: infectionDeck,
                infectionDiscardPile: infectionDiscardPile,
                cities: newCities
            };
        },
        async assignRoleAndCardsToPlayers(deck: PlayingCard[]): Promise<{deck: PlayingCard[];
        players: Player[];}> {
            const gameRoles = shuffleCards([...roles]);
            const players = this.typedGame.players;
            for (let index = 0; index < players.length; index++) {
                players[index].role = gameRoles.pop();
                players[index].playingCards =
                    [deck.pop() as PlayingCard, deck.pop() as PlayingCard];
            }
            const assignedPlayers = this.setStartingPlayer(players);
            await updateAllPlayers(assignedPlayers);
            return {
                deck: deck,
                players: assignedPlayers
            };
        },
        setStartingPlayer(players: Player[]): Player[] {
            const populations: number[] = [];
            players.forEach((player) => {
                player.playingCards
                    .filter((card) => card.type === PlayingCardType.City)
                    .forEach((card) => populations.push(card.city!.population));
            });
            const maxPopulation = populations.sort((a, b) => b-a)[0];

            const playerIndex = players.findIndex((player) => {
                return player.playingCards!
                    .filter((card: PlayingCard) => card.type === PlayingCardType.City)
                    .find((card: PlayingCard) => card.city!.population === maxPopulation);
            });
            if (playerIndex) players[playerIndex].activeTurn = true;
            else players[0].activeTurn = true;
            return players;
        },
        addPandemicCardsToDeck(deck: PlayingCard[]): PlayingCard[] {
            const pandemicCards = this.typedGame.difficulty;
            const splitSize = Math.round(deck.length/pandemicCards);
            const splitDeck: PlayingCard[][] = [];
            for (let index = 0; index < pandemicCards-1; index++)
                splitDeck.push(deck.splice(0, random.int(splitSize-2, splitSize+2)));
            splitDeck.push(deck);
            let fullDeck: PlayingCard[] = [];
            for (let index = 0; index < splitDeck.length; index++) {
                const pandemicPosition = random.int(0, splitDeck[index].length-1);
                splitDeck[index].splice(pandemicPosition, 0, { type: PlayingCardType.Pandemic });
                fullDeck = [...fullDeck, ...splitDeck[index]];
            }
            return fullDeck;
        }
    }
});
</script>
