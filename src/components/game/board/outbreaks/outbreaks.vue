<template>
    <div class="outbreak-wrapper w-44 shadow-2xl rounded-br-lg"
         @mouseover="show = true"
         @mouseleave="show = false"
    >
        <div class="flex space-x-1.5">
            <transition name="slide-fade" mode="out-in">
                <p v-if="!show" class="text-lg font-bold select-none">{{ game.outbreaks }}</p>
            </transition>
            <p class="text-lg font-bold select-none">Ausbrüche</p>
        </div>
        <transition name="slide-fade" mode="out-in">
            <div v-if="show" class="flex items-center space-x-3">
                <p class="text-4xl font-bold text-center select-none">
                    {{ game.outbreaks }}
                </p>
                <div class="flex justify-around items-center space-x-2">
                    <c-icon-button
                        aria-label="Verringern"
                        variant-color="blue"
                        bg="blue.700"
                        color="white"
                        size="sm"
                        icon="minus"
                        @click="changeOutbreak(true)"
                    />

                    <c-icon-button
                        aria-label="Erhöhen"
                        variant-color="blue"
                        bg="blue.700"
                        color="white"
                        size="sm"
                        icon="add"
                        @click="changeOutbreak(false)"
                    />
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { changeOutbreaks } from "@/services/firebase";
import { Game } from "@/types";

@Component
export default class Outbreaks extends Vue {
    @Prop({ required: true }) game!: Game;

    public show = false;

    public async changeOutbreak(remove?: boolean) {
        await changeOutbreaks(remove);
    }
}
</script>

<style>
.outbreak-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #EBF0FC;
    padding: 10px;
}

</style>
