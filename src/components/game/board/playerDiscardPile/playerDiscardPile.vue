<template>
    <div class="player-discard-pile-wrapper mt-3">
        <h3 class="font-bold">Karten im Spielerstapel: {{ game.playerDeck.length }}</h3>
        <h2 class="text-lg font-bold">Spielerablegestapel</h2>
        <div class="max-h-48 pt-1 overflow-y-scroll">
            <div v-if="sortedDiscardPile.length === 0" class="text-xs text-gray-700">
                Keine Karten im Ablegestapel
            </div>
            <div class="rounded bg-gray-200 font-semibold mb-1"
                v-for="(card, index) in sortedDiscardPile" :key="index">
                <div v-if="card.type === 'CITY'" class="flex items-center justify-between relative">
                    <div :class="regionClass(card.city.region)" />
                    <div class="w-4/5 pl-8 text-sm text-left py-1">{{ card.city.city }}</div>
                    <c-icon-button
                        v-if="isCrisisManager"
                        variant-color="blue"
                        aria-label="Karte aufnehmen"
                        size="sm"
                        icon="arrow-down"
                        @click="pickCard(index)"
                    />
                </div>
                <div v-if="card.type === 'ACTION'" class="flex items-center justify-between">
                    <div class="w-4/5 text-sm py-1 pl-8">
                        <action-popup :action="card.action"/>
                    </div>
                    <c-icon-button
                        v-if="isCrisisManager"
                        variant-color="blue"
                        aria-label="Karte aufnehmen"
                        size="sm"
                        icon="arrow-down"
                        @click="pickCard(index)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ActionPopup from "@/components/game/playerBar/actionPopup";
import { Game, Region } from "@/types";
import { auth, pickupDiscardedPlayingCard } from "@/services/firebase";

@Component({ components: { ActionPopup } })
export default class PlayingCards extends Vue {
    @Prop({ required: true }) game!: Game;

    get sortedDiscardPile() {
        return JSON.parse(JSON.stringify(this.game.playerDiscardPile)).reverse();
    }

    get isCrisisManager(): boolean {
        const currentId = auth.currentUser?.uid;
        const currentPlayer = this.game.players.find((player) => player.id === currentId);
        return currentPlayer?.role?.name === "Krisenmanager";
    }

    public regionClass(region: Region): string {
        return `region rounded ${region}`;
    }

    public pickCard(cardIndex: number) {
        pickupDiscardedPlayingCard(this.sortedDiscardPile.length - cardIndex - 1);
    }
}
</script>

<style scoped>
.player-discard-pile-wrapper {
    position: absolute;
    bottom: 10px;
    left: 10px;
    width: 15%;
}

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
