<template>
    <div class="flex justify-center h-full w-full">
        <div v-for="player in game.players"
             :key="player.id"
             class="mx-2 w-1/6 shadow-lg overflow-hidden rounded-lg"
        >
            <div
                class="flex w-full justify-between text-white items-center rounded-b"
                :style="{ backgroundColor: roleColor(player) }"
            >
                <p class="pl-2 py-2 font-bold text-xs">{{ player.name }}</p>
                <role-popup :player="player" />

                <c-button
                    v-if="activePlayer(player)"
                    class="p-0 m-0"
                    variant-color="blue"
                    size="sm"
                    @click="drawPlayingCards"
                >
                    +2
                </c-button>
            </div>

            <playing-cards
                :player="player"
                @player-deck-update="playerDeckUpdate(player, $event)"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

import RolePopup from "./rolePopup";
import { Game, Player, PlayingCard } from "@/types";
import PlayingCards from "@/components/game/playerBar/playingCards";
import {
    updateAllPlayers,
    updatePlayerPlayingCards,
    drawPlayingCards,
    auth
} from "@/services/firebase";


@Component({
    components: {
        PlayingCards,
        RolePopup
    }
})
export default class PlayerBar extends Vue {
    @Prop({ required: true }) readonly game!: Game;

    private playersWithDeckUpdates: Player[] = [];

    @Watch("playersWithDeckUpdates")
    onPlayerWithDeckUpdates(array) {
        if (array.length === 2) {
            this.performPlayerChanges(array);
            this.playersWithDeckUpdates = [];
        }
    }

    public activePlayer(player: Player): boolean {
        const current = auth.currentUser?.uid;
        return player.activeTurn && current === player.id;
    }

    public async drawPlayingCards(): Promise<void> {
        return await drawPlayingCards();
    }

    public roleColor(player: Player): string {
        if (player.role) return player.role?.color;
        return "#1972FF";
    }

    public playerDeckUpdate(player: Player, action: { newDeck: PlayingCard[]; dropResult: {
        removedIndex: number; addedIndex: number; payload: PlayingCard; }; }): void {
        const { removedIndex, addedIndex } = action.dropResult;

        if (removedIndex != null && addedIndex != null) {
            updatePlayerPlayingCards(action.newDeck, player);
        } else {
            const alteredPlayer = { ...player };
            alteredPlayer.playingCards = action.newDeck;
            this.playersWithDeckUpdates.push(alteredPlayer);
        }
    }

    private async performPlayerChanges(array: Player[]): Promise<void> {
        const newPlayers = [...this.game.players];
        const firstIndex = newPlayers.findIndex((player) => player.id === array[0].id) as number;
        const secondIndex = newPlayers.findIndex((player) => player.id === array[1].id) as number;
        newPlayers[firstIndex] = array[0];
        newPlayers[secondIndex] = array[1];
        await updateAllPlayers(newPlayers);
    }
}
</script>
