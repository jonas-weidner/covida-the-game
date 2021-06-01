<template>
    <div class="flex flex-col items-center"
         @mouseover="show = true"
         @mouseleave="show = false"
    >
        <h2 class=" font-bold text-center select-none mb-1">{{ $t('other.deck') }}</h2>
        <transition name="slide-fade" mode="out-in">
            <h3 v-if="show" class="font-bold select-none mb-1 text-sm">
                <span class="text-blue-500">{{ game.infectionDeck.length }}</span>
                {{ $t('menu.cards') }} {{ $t('other.left') }}
            </h3>
        </transition>
        <c-tooltip has-arrow :label="$t('infections.drawInfectionCard')" placement="left">
            <c-icon-button
                :isRound="true"
                variant-color="blue"
                bg="blue.800"
                color="white"
                size="md"
                icon="hand-holding-medical"
                aria-label="Draw"
                @click="DrawInfectionCard"
            />
        </c-tooltip>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { drawInfectionCard } from "@/services/firebase";
import { Game } from "@/interfaces";

@Component
export default class DrawInfectionCard extends Vue {
    @Prop({ required: true }) game!: Game;
    public show = false;

    public async drawInfectionCard(): Promise<void> {
        await drawInfectionCard(false);
    }
}
</script>
