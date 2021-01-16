<template>
    <div class="outbreak-wrapper mt-2">
        <h2 class="text-lg font-bold">Ausbrüche</h2>
        <div class="flex items-center space-x-3">
            <p class="text-4xl font-bold text-center">
                {{ game.outbreaks }}
            </p>
            <div class="flex justify-around items-center space-x-2">
                <c-icon-button
                    aria-label="Verringern"
                    size="sm"
                    icon="minus"
                    @click="changeOutbreak(true)"
                />

                <c-icon-button
                    aria-label="Erhöhen"
                    size="sm"
                    icon="add"
                    @click="changeOutbreak(false)"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { changeOutbreaks } from "@/services/firebase";
import { Game } from "@/types";

@Component
export default class Outbreaks extends Vue {
    @Prop({ required: true }) game!: Game;

    public async changeOutbreak(remove?: boolean) {
        await changeOutbreaks(remove);
    }
}
</script>

<style>
.outbreak-wrapper {
    position: absolute;
    top: 0;
    left: 10px;
}

</style>
