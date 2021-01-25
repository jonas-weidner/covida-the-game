<template>
    <div class="w-56"
         @mouseover="show = true"
         @mouseleave="show = false"
    >
        <h2 class="font-bold select-none">{{ $t('other.discardPile') }}</h2>
        <transition name="slide-fade" mode="out-in">
        <div :class="discardClasses">
            <div v-if="sortedDiscardPile.length === 0" class="text-xs font-semibold select-none">
                {{ $t('other.noCardsInDeck') }}
            </div>
            <div class="rounded bg-gray-200 font-semibold mb-1"
                v-for="(card, index) in sortedDiscardPile" :key="index">
                <div v-if="card.type === 'CITY'" class="flex items-center justify-between relative">
                    <div :class="regionClass(card.city.region)" />
                    <div class="w-4/5 pl-8 text-sm text-left py-1 select-none">
                        {{ card.city.city }}
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
        </transition>
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

    public show = false;

    get sortedDiscardPile() {
        return JSON.parse(JSON.stringify(this.game.playerDiscardPile)).reverse();
    }

    get discardClasses(): string {
        return `${ this.show ? "max-h-56" : "max-h-10" } pt-2 px-2 pb-1 overflow-y-scroll
            overflow-x-hidden bg-white shadow-lg rounded-lg height-animation`;
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

<style>

.region {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 20px;
}

.height-animation {
    -webkit-transition: max-height .4s;
    -moz-transition: max-height .4s;
    -ms-transition: max-height .4s;
    -o-transition: max-height .4s;
    transition: max-height .4s;
}

.BLUE {
    background-color: blue;
}

.RED {
    background-color: #EF0C5B;
}

.YELLOW {
    background-color: #ffd500;
}

.BLACK {
    background-color: black;
}

.slide-fade-enter-active {
    transition: all .3s ease !important;
}
.slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0) !important;
}
.slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(50px) !important;
    opacity: 0 !important;
}
</style>
