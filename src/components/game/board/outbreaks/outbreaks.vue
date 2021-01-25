<template>
    <div class="outbreak-wrapper w-44 shadow-2xl rounded-br-lg"
         @mouseover="show = true"
         @mouseleave="show = false"
    >
        <div class="flex space-x-1.5">
            <p v-if="!show" class="text-lg font-bold select-none">{{ game.outbreaks }}</p>
            <p class="text-lg font-bold select-none">{{ $t('game.outbreaks') }}</p>
        </div>
        <transition name="slide-x" mode="out-in">
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

<style scoped>
.outbreak-wrapper {
    position: absolute;
    top: 0;
    left: 0;
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
    transform: translateX(-50px) !important;
    opacity: 0 !important;
}

</style>
