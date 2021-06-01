<template>
    <div @mouseover="show = true"
         @mouseleave="show = false"
         class="w-44"
    >
        <div class="flex justify-end">
            <h2 class="font-bold select-none">{{ $t('other.discardPile') }}</h2>
        </div>
        <transition name="slide-fade" mode="out-in">
            <div :class="discardClasses">
                <div v-if="sortedDiscardPile.length === 0"
                     class="text-xs font-semibold select-none">
                    {{ $t('other.noCardsInDeck') }}
                </div>
                <div
                    class="rounded bg-gray-200 font-semibold mb-1"
                    v-for="(card) in sortedDiscardPile" :key="card.city"
                >
                    <div class="flex items-center relative">
                        <div :class="regionClass(card.region)" />
                        <div class="pl-8 text-sm text-left">{{ $t(`cities.${card.city}`) }}</div>
                    </div>

                </div>
            </div>
        </transition>
        <div class="flex items-center justify-center space-x-3 mt-3" v-if="pandemicCardOnHand">
            <c-tooltip has-arrow :label="$t('infections.drawBottomCard')" placement="left">
                <c-icon-button
                    :isRound="true"
                    variant-color="blue"
                    bg="blue.800"
                    color="white"
                    size="md"
                    icon="hand-holding-medical"
                    aria-label="Draw"
                    @click="drawInfectionCard(true)"
                />
            </c-tooltip>

            <c-tooltip has-arrow :label="$t('infections.reshuffleAndBack')" placement="left">
                <c-icon-button
                    :isRound="true"
                    variant-color="blue"
                    bg="blue.800"
                    color="white"
                    size="md"
                    icon="random"
                    aria-label="Draw"
                    @click="shuffleAndBackOnTop"
                />
            </c-tooltip>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { CityCard, Game, PlayingCardType, Region } from "@/interfaces";
import { drawInfectionCard, shuffleAndBackOnTop } from "@/services/firebase";

@Component
export default class InfectionDiscardPile extends Vue {
    @Prop({ required: true }) game!: Game;

    public show = false;

    get sortedDiscardPile() {
        return JSON.parse(JSON.stringify(this.game.infectionDiscardPile)).reverse();
    }

    public regionClass(region: Region): string {
        return `region rounded text-left ${region}`;
    }

    get discardClasses(): string {
        return `${ this.show ? "max-h-40" : "max-h-10" } height-animation pt-1 overflow-y-scroll
            mt-1 pt-2 px-2 pb-1 overflow-x-hidden bg-white shadow-lg rounded-lg`;
    }

    get pandemicCardOnHand(): boolean {
        if (this.game) {
            const handCards = this.game.players.map((player) => player.playingCards).flat();
            return handCards.find((card) => card.type === PlayingCardType.Pandemic) !== undefined;
        }
        return false;
    }

    public async drawInfectionCard(last?: boolean): Promise<void> {
        await drawInfectionCard(last);
    }

    public async shuffleAndBackOnTop(): Promise<void> {
        await shuffleAndBackOnTop();
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
    background-color: #EF0C5B;
}

.YELLOW {
    background-color: #ffd500;
}

.BLACK {
    background-color: black;
}
</style>
