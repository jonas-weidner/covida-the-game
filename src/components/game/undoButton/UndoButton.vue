<template>
    <div class="undo-button-wrapper" v-if="game && game.lastGameStates.length > 0">
        <c-icon-button
            :isRound="true"
            variant-color="blue"
            bg="blue.800"
            color="white"
            size="lg"
            aria-label="Undo"
            icon="arrow-down"
            @click="undo"
        />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { restoreLastGameState } from "@/services/firebase";
import { Game } from "@/types";

@Component
export default class UndoButton extends Vue {
    @Prop({ required: true }) game!: Game;
    public async undo(): Promise<void> {
        await restoreLastGameState();
    }
}
</script>

<style scoped>
.undo-button-wrapper {
    position: absolute;
    z-index: 10;
    bottom: 2%;
    left: 2%;
}
</style>
