<template>
    <div class="text-center"
         @mouseover="show = true"
         @mouseleave="show = false"
    >
        <h2 class=" font-bold text-center select-none mb-1">Nachziehstapel</h2>
        <transition name="slide-fade" mode="out-in">
            <h3 v-if="show" class="font-bold select-none my-2 text-sm">
                Noch <span class="text-blue-500">{{ game.playerDeck.length }}</span> Karten
            </h3>
        </transition>
        <div class="flex justify-center space-x-4">
            <c-tooltip has-arrow label="Ziehen" placement="right">
                <c-icon-button
                    :isRound="true"
                    variant-color="blue"
                    bg="blue.800"
                    color="white"
                    size="md"
                    icon="hand-holding-medical"
                    aria-label="Draw"
                    @click="drawPlayingCards"
                />
            </c-tooltip>

            <c-tooltip v-if="isJonas" has-arrow label="Nachziehstapel auffüllen" placement="right">
                <c-icon-button
                    :isRound="true"
                    variant-color="blue"
                    bg="blue.800"
                    color="white"
                    size="md"
                    icon="gift"
                    aria-label="Auffüllen"
                    @click="refillPlayerCardDeck"
                />
            </c-tooltip>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { auth, drawPlayingCard, setPlayerDeck, setPlayerDiscardPile } from "@/services/firebase";
import { Game } from "@/types";

@Component
export default class PlayingCardDeck extends Vue {
    @Prop({ required: true }) game!: Game;
    public show = false;

    get isJonas(): boolean {
        return auth.currentUser?.email === "jonas@adabt.com";
    }

    public async drawPlayingCards(): Promise<void> {
        return await drawPlayingCard();
    }

    public async refillPlayerCardDeck(): Promise<void> {
        const discardPile = JSON.parse(JSON.stringify(this.game.playerDiscardPile));
        const newDeck = [...discardPile, ...this.game.playerDeck];
        await setPlayerDeck(newDeck);
        await setPlayerDiscardPile([]);
    }
}
</script>
