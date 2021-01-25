<template>
    <div class="flex flex-col items-center">
        <h2 class=" font-bold text-center select-none mb-1">{{ $t('other.deck') }}</h2>
        <c-tooltip has-arrow :label="$t('infections.drawInfectionCard')" placement="left">
            <c-icon-button
                :isRound="true"
                variant-color="blue"
                bg="blue.800"
                color="white"
                size="md"
                icon="hand-holding-medical"
                aria-label="Draw"
                @click="drawInfectionCard"
            />
        </c-tooltip>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { drawInfectionCard } from "@/services/firebase";
import { Game } from "@/types";

@Component
export default class DrawInfectionCard extends Vue {
    @Prop({ required: true }) game!: Game;

    public async drawInfectionCard(): Promise<void> {
        await drawInfectionCard(false);
    }
}
</script>
