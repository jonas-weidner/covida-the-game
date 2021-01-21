<template>
    <div class="mt-5 flex flex-col">
        <c-button variant-color="blue" size="sm" @click="drawInfectionCard">
            <div class="text-xxs">Infektionskarte ziehen</div>
        </c-button>

        <c-button v-if="pandemicCardOnHand" class="mt-1" size="sm" @click="drawInfectionCard(true)">
            <div class="text-xxs">Letzte Infektionskarte ziehen</div>
        </c-button>

        <c-button v-if="pandemicCardOnHand" class="mt-1" variant-color="blue" size="sm" @click="shuffleAndBackOnTop">
            <div class="text-xxs">Mischen und zurück</div>
        </c-button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { drawInfectionCard, shuffleAndBackOnTop } from "@/services/firebase";
import { Game, PlayingCardType } from "@/types";

@Component
export default class DrawInfectionCard extends Vue {
    @Prop({ required: true }) game!: Game;

    get pandemicCardOnHand(): boolean {
        if (this.game) {
            const handCards = this.game.players.map((player) => player.playingCards).flat();
            return handCards.find((card) => card.type === PlayingCardType.Pandemic) !== undefined;
        }
        return false;
    }

    public async drawInfectionCard(last?: boolean): Promise<void> {
        await drawInfectionCard(last);
    }

    public async shuffleAndBackOnTop(): Promise<void> {
        await shuffleAndBackOnTop();
    }
}
</script>
