<template>
    <div
        class="next-turn-wrapper"
        v-if="hasActiveTurn"
    >
        <c-button variant-color="blue" size="sm" @click="nextPlayer">
            <div class="text-xs">Nächster Spieler</div>
        </c-button>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { auth, nextPlayer } from "@/services/firebase";
import { Game } from "@/types";

@Component
export default class NextTurn extends Vue {
    @Prop({ required: true }) game!: Game;

    get hasActiveTurn(): boolean {
        const user = auth.currentUser?.uid as string;
        return this.game?.players
            .find((player) => player.activeTurn && player.id === user) != null;
    }

    public nextPlayer() {
        nextPlayer();
    }
}
</script>

<style scoped>
.next-turn-wrapper {
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
