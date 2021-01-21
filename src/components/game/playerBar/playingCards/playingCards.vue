<template>
    <div>
        <Container @drop="onDrop" group-name="playingCards" :get-child-payload="getChildPayload">
            <Draggable class="rounded bg-gray-200 font-semibold mt-1 overflow-hidden"
                 v-for="(card, index) in sortedPlayingCards" :key="index">
                <div class="draggable-item cursor-pointer">
                    <div v-if="card.type === 'CITY'" class="flex items-center justify-end relative">
                        <div :class="regionClass(card.city.region)" />
                        <div class="w-3/5 text-sm py-1">{{ card.city.city }}</div>
                        <div class="w-1/5 text-xs font-light text-gray-400">
                            {{ population(card.city.population) }}
                        </div>
                        <c-icon-button
                            v-if="currentUser"
                            variant-color="blue"
                            aria-label="Karte spielen"
                            size="sm"
                            icon="arrow-up"
                            @click="playHandCard(card)"
                        />
                    </div>

                    <div v-if="card.type === 'ACTION'" class="flex items-center justify-end">
                        <div class="w-3/5 text-sm py-1">
                            <action-popup :action="card.action"/>
                        </div>
                        <div class="w-1/5"/>
                        <c-icon-button
                            v-if="currentUser"
                            variant-color="blue"
                            aria-label="Karte spielen"
                            size="sm"
                            icon="arrow-up"
                            @click="playHandCard(card)"
                        />
                    </div>

                    <div v-if="card.type === 'PANDEMIC'" class="flex items-center justify-end">
                        <div class="w-3/5 text-sm py-1">Epidemie</div>
                        <div class="w-1/5"/>
                        <c-icon-button
                            v-if="currentUser"
                            variant-color="blue"
                            aria-label="Karte entfernen"
                            size="sm"
                            icon="small-close"
                            @click="playHandCard(card, true)"
                        />
                    </div>
                </div>
            </Draggable>
        </Container>
        <resilient-population-popup ref="resilient" :game="game" />
        <forecast-popup ref="forecast" :game="game" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Container, Draggable } from "vue-smooth-dnd";
import { Game, Player, PlayingCard, PlayingCardType, Region } from "@/types";
import ActionPopup from "@/components/game/playerBar/actionPopup";
import numeral from "numeral";
import { auth, playHandCard } from "@/services/firebase";
import { applyDrag } from "@/services/dnd";
import ResilientPopulationPopup
    from "@/components/game/playerBar/playingCards/resilientPopulationPopup";
import ForecastPopup
    from "@/components/game/playerBar/playingCards/forecastPopup";

@Component({
    components: {
        ResilientPopulationPopup,
        ForecastPopup,
        ActionPopup,
        Container,
        Draggable
    }
})
export default class PlayingCards extends Vue {
    @Prop({ required: true }) readonly game!: Game;
    @Prop() player!: Player;

    get sortedPlayingCards(): PlayingCard[] {
        if (this.player) return JSON.parse(JSON.stringify(this.player.playingCards)).reverse();
        return [];
    }

    get currentUser() {
        const authenticated = auth.currentUser?.uid;
        return authenticated === this.player.id;
    }

    public regionClass(region: Region): string {
        return `region rounded ${region}`;
    }

    public getChildPayload(index: number): PlayingCard {
        return this.player.playingCards[index];
    }

    public async playHandCard(card: PlayingCard, remove?: boolean): Promise<void> {
        if (card.type === PlayingCardType.Action && card.action?.name === "Zähe Bevölkerung")
            (this.$refs.resilient as any).open();
        else if (card.type === PlayingCardType.Action && card.action?.name === "Prognose")
            (this.$refs.forecast as any).open();

        return await playHandCard(card, remove);
    }

    public population(pop: number): string {
        return numeral(pop).format("'0.0a'");
    }

    public onDrop(dropResult: { removedIndex: number; addedIndex: number; payload: PlayingCard }): void {
        if (dropResult.removedIndex != null || dropResult.addedIndex != null)
            this.$emit("player-deck-update", {
                newDeck: applyDrag(this.sortedPlayingCards, dropResult).reverse(),
                dropResult: dropResult
            });
    }
}
</script>

<style scoped>
.region {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 20px;
}

.BLUE {
    background-color: blue;
}

.RED {
    background-color: red;
}

.YELLOW {
    background-color: #ffd500;
}

.BLACK {
    background-color: black;
}
</style>
