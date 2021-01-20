<template>
    <div
        v-if="game != null && game.diseaseStates != null"
        class="medicines-wrapper flex flex-col items-center justify-center"
    >
        <div class="py-1" v-for="color in Object.keys(game.diseaseStates)" :key="color">
            <div class="flex justify-center items-center space-x-2">
                <div
                    v-for="(state, index) in states" :key="index"
                    :class="diseaseClasses(color, state)"
                    @click="changeDiseaseState(color, state)"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { DiseaseState, Game } from "@/types";
import { updateDiseaseStates } from "@/services/firebase";

@Component
export default class Medicines extends Vue {
    @Prop({ required: true }) game!: Game;

    private states = [DiseaseState.Cured, DiseaseState.Found, DiseaseState.NotFound];

    public diseaseClasses(color: string, state: string): string {
        const gameState: DiseaseState = this.game.diseaseStates[color];
        const baseClasses = `w-4 h-8 ${color}-border rounded-full cursor-pointer opacity-40`;
        if (gameState === state)
            return `${baseClasses} ${color}-bg`;
        return baseClasses;
    }

    public async changeDiseaseState(color: string, state: DiseaseState): Promise<void> {
        const gameStates = { ...this.game.diseaseStates };
        gameStates[color] = state;
        await updateDiseaseStates(gameStates);
    }
}
</script>

<style>
.medicines-wrapper {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translate(0%, -50%);
}

.blue-bg {
    background-color: blue;
}

.red-bg {
    background-color: red;
}

.yellow-bg {
    background-color: #ffd500;
}

.black-bg {
    background-color: black;
}

.blue-border {
    border: 2px solid blue;
}

.red-border {
    border: 2px solid red;
}

.yellow-border {
    border: 2px solid #ffd500;
}

.black-border {
    border: 2px solid black;
}

</style>
