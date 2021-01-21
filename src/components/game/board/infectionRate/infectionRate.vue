<template>
    <div class="infection-rate-wrapper rounded-bl-2xl">
        <h2 class="text-lg font-bold text-end">Infektionsgrad</h2>
        <div class="flex items-center justify-end space-x-3">
            <p class="text-4xl font-bold text-center">
                {{ game.infectionRate }}
            </p>
            <div class="flex justify-around items-center space-x-2">
                <c-icon-button
                    aria-label="Verringern"
                    size="sm"
                    icon="minus"
                    @click="changeInfectionRate(true)"
                />

                <c-icon-button
                    aria-label="Erhöhen"
                    size="sm"
                    icon="add"
                    @click="changeInfectionRate(false)"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { changeInfectionRate } from "@/services/firebase";
import { Game } from "@/types";

@Component
export default class InfectionRate extends Vue {
    @Prop({ required: true }) game!: Game;

    async changeInfectionRate(remove?: boolean) {
        await changeInfectionRate(remove);
    }
}
</script>

<style>
.infection-rate-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    background-color: rgba(255,255,255,0.3);
    padding: 10px;
}

</style>
