<template>
    <div>
        <c-tooltip has-arrow :label="$t('game.startGame')" placement="right">
            <c-icon-button
                :isRound="true"
                variant-color="green"
                size="lg"
                icon="play"
                aria-label="Start game"
                @click="startGame"
                :isDisabled="notAllPlayersPresent"
            />
        </c-tooltip>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { playingCards } from "@/assets/playingCards";
import { shuffleCards } from "@/services/gameActions";
import { City, CityCard, Game, Player, PlayingCard, PlayingCardType } from "@/types";
import random from "random";
import {
    auth,
    initializeCities,
    initializeInfectionDeck,
    initializeInfectionDiscardPile,
    setPlayerDeck, startGame,
    updateAllPlayers
} from "@/services/firebase";
import { roles } from "@/assets/roles";
import { cities } from "@/assets/cities";
import { infectionCards } from "@/assets/infectionCards";

@Component
export default class StartGame extends Vue {
    @Prop({ required: true }) game!: Game;

    get notAllPlayersPresent(): boolean {
        if (auth.currentUser?.email === "jonas@adabt.com") return false;
        return this.game.numberOfPlayers !== this.game.players.length;
    }

    public async startGame() {
        const assigned = await this
            .assignRoleAndCardsToPlayers(
                shuffleCards(JSON.parse(JSON.stringify([...playingCards]))));
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
    }

    private initializeCities(players: Player[]): City[] {
        const newCities = JSON.parse(JSON.stringify([...cities]));
        const atlantaIndex = newCities.findIndex((city) => city.city === "Atlanta");
        newCities[atlantaIndex].researchStation = true;
        newCities[atlantaIndex].playersInCity = players;
        return newCities;
    }

    //eslint-disable-next-line
    private initializeInfectionDeck(newCities: City[]): { infectionDeck: CityCard[];
        infectionDiscardPile: CityCard[]; cities: City[];
    } {
        const infectionDeck = shuffleCards(JSON.parse(JSON.stringify([...infectionCards]))) as
            CityCard[];
        let infectionDiscardPile: CityCard[] = [];
        for (let index = 3; index > 0; index--) {
            const threeCards = infectionDeck.splice(0, 3);
            infectionDiscardPile = [...infectionDiscardPile, ...threeCards];
            for (const card of threeCards) {
                const cityIndex = newCities.findIndex((city) => city.city === card.city);
                const regionString = card.region.toString().toLowerCase();
                newCities[cityIndex].diseaseCubes[regionString] = index;
            }
        }

        return {
            infectionDeck: infectionDeck,
            infectionDiscardPile: infectionDiscardPile,
            cities: newCities
        };
    }

    private async assignRoleAndCardsToPlayers(deck: PlayingCard[]): Promise<{deck: PlayingCard[];
        players: Player[];}> {
        const gameRoles = shuffleCards([...roles]);
        const players = this.game.players;
        for (let index = 0; index < players.length; index++) {
            players[index].role = gameRoles.pop();
            const handCards: PlayingCard[] = [];
            for (let i = 0; i < this.getNumberOfStartingCards(); i++)
                handCards.push(deck.pop()!);
            players[index].playingCards = [...handCards];
        }
        const assignedPlayers = this.setStartingPlayer(players);
        await updateAllPlayers(assignedPlayers);
        return {
            deck: deck,
            players: assignedPlayers
        };
    }

    private getNumberOfStartingCards(): number {
        const numPlayers = this.game.numberOfPlayers;
        if (numPlayers === 2) return 4;
        else if (numPlayers === 3) return 3;
        return 2;
    }

    private setStartingPlayer(players: Player[]): Player[] {
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
    }

    private addPandemicCardsToDeck(deck: PlayingCard[]): PlayingCard[] {
        const pandemicCards = this.game.difficulty;
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
</script>
