<template>
    <div>
        <c-tooltip has-arrow :label="$t('other.undo')" placement="right">
            <c-icon-button
                :isRound="true"
                variant-color="blue"
                bg="blue.800"
                color="white"
                size="sm"
                icon="undo"
                aria-label="Undo"
                @click="undo"
                :isDisabled="!game || game.lastGameStates.length === 0"
            />
        </c-tooltip>
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
