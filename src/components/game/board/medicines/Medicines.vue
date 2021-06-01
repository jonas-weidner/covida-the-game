<template>
    <div class="medicines-wrapper rounded-l-2xl">
        <div class="py-1" v-for="color in diseaseStates" :key="color">
            <div class="flex justify-center items-center space-x-2">
                <div :class="diseaseClasses(color)" @click="changeDiseaseState(color)">
                    <font-awesome-icon
                        v-if="game.diseaseStates[color] === 'FOUND'"
                        icon="capsules" size="xs"
                    />
                    <font-awesome-icon
                        v-if="game.diseaseStates[color] === 'NOTFOUND'"
                        icon="times-circle" size="xs"
                    />
                    <font-awesome-icon
                        v-if="game.diseaseStates[color] === 'CURED'"
                        icon="check-double" size="xs"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { DiseaseState, Game } from "@/interfaces";
import { updateDiseaseStates } from "@/services/firebase";

@Component
export default class Medicines extends Vue {
    @Prop({ required: true }) game!: Game;

    private states = [DiseaseState.Cured, DiseaseState.Found, DiseaseState.NotFound];

    get diseaseStates(): string[] {
        if (this.game)
            return Object.keys(this.game.diseaseStates).sort();
        return [];
    }

    public diseaseClasses(color: string): string {
        const gameState: DiseaseState = this.game.diseaseStates[color];
        const baseClasses = `w-8 h-8 ${color}-border rounded-full cursor-pointer
            flex justify-center items-center`;
        if (gameState !== DiseaseState.NotFound)
            return `${baseClasses} ${color}-bg text-white`;
        return baseClasses;
    }

    public async changeDiseaseState(color: string): Promise<void> {
        const gameStates = { ...this.game.diseaseStates };
        if (gameStates[color] === DiseaseState.NotFound)
            gameStates[color] = DiseaseState.Found;
        else if (gameStates[color] === DiseaseState.Found)
            gameStates[color] = DiseaseState.Cured;
        else if (gameStates[color]) gameStates[color] = DiseaseState.NotFound;
        await updateDiseaseStates(gameStates);
    }
}
</script>

<style>
.medicines-wrapper {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0%, -50%);
    background-color: #EBF0FC;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.blue-bg {
    background-color: blue;
}

.red-bg {
    background-color: #EF0C5B;
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
    border: 2px solid #EF0C5B;
}

.yellow-border {
    border: 2px solid #ffd500;
}

.black-border {
    border: 2px solid black;
}

</style>
