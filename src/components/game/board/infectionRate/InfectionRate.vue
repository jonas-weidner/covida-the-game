<template>
    <div class="infection-rate-wrapper w-44 shadow-2xl rounded-bl-lg"
         @mouseover="show = true"
         @mouseleave="show = false"
    >
        <div class="flex space-x-1.5 justify-end">
            <p class="text-lg font-bold select-none">{{ $t('infections.infectionRate') }}</p>
            <p v-if="!show" class="text-lg font-bold select-none">
                {{ game.infectionRate }}
            </p>
        </div>
        <transition name="slide-x" mode="out-in">
            <div v-if="show" class="flex items-center justify-end space-x-3">
                <p class="text-4xl font-bold text-center select-none">
                    {{ game.infectionRate }}
                </p>
                <div class="flex justify-around items-center space-x-2">
                    <c-icon-button
                        aria-label="Verringern"
                        variant-color="blue"
                        bg="blue.700"
                        color="white"
                        size="sm"
                        icon="minus"
                        @click="changeInfectionRate(true)"
                    />

                    <c-icon-button
                        aria-label="Erhöhen"
                        variant-color="blue"
                        bg="blue.700"
                        color="white"
                        size="sm"
                        icon="add"
                        @click="changeInfectionRate(false)"
                    />
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { changeInfectionRate } from "@/services/firebase";
import { Game } from "@/interfaces";

@Component
export default class InfectionRate extends Vue {
    @Prop({ required: true }) game!: Game;
    public show = false;
    async changeInfectionRate(remove?: boolean) {
        await changeInfectionRate(remove);
    }
}
</script>

<style scoped>
.infection-rate-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    background-color: #EBF0FC;
    padding: 10px;
}

.slide-x-enter-active {
    transition: all .3s ease !important;
}
.slide-x-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0) !important;
}
.slide-x-enter, .slide-x-leave-to {
    transform: translateX(50px) !important;
    opacity: 0 !important;
}
</style>
