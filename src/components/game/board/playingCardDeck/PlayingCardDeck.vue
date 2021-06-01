<template>
    <div class="text-center"
         @mouseover="show = true"
         @mouseleave="show = false"
    >
        <h2 class=" font-bold text-center select-none mb-1">{{ $t('other.deck') }}</h2>
        <transition name="slide-fade" mode="out-in">
            <h3 v-if="show" class="font-bold select-none my-1 text-sm">
                <span class="text-blue-500">{{ game.playerDeck.length }}</span>
                {{ $t('menu.cards') }} {{ $t('other.left') }}
            </h3>
        </transition>
        <div class="flex justify-center space-x-4">
            <c-tooltip has-arrow :label="$t('playerCards.drawPlayerCard')" placement="right">
                <c-icon-button
                    :isRound="true"
                    variant-color="blue"
                    bg="blue.800"
                    color="white"
                    size="md"
                    icon="hand-holding-medical"
                    aria-label="Draw"
                    @click="drawPlayingCards"
                />
            </c-tooltip>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { drawPlayingCard } from "@/services/firebase";
import { Game } from "@/interfaces";

@Component
export default class PlayingCardDeck extends Vue {
    @Prop({ required: true }) game!: Game;
    public show = false;

    public async drawPlayingCards(): Promise<void> {
        return await drawPlayingCard();
    }
}
</script>
