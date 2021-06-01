<template>
    <div>
        <c-tooltip has-arrow :label="$t('game.nextPlayer')" placement="right">
            <c-icon-button
                :isRound="true"
                variant-color="blue"
                bg="blue.800"
                color="white"
                size="sm"
                icon="forward"
                aria-label="Next player"
                @click="nextPlayer"
                :disabled="!hasActiveTurn"
            />
        </c-tooltip>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { auth, nextPlayer } from "@/services/firebase";
import { Game } from "@/interfaces";

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
