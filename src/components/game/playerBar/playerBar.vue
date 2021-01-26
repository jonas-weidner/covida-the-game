<template>
    <div class="flex justify-center h-full w-full">
        <div v-for="player in game.players"
             :key="player.id"
             class="mx-2 w-1/4 xl:w-1/6 bg-white p-2 shadow-2xl
             overflow-x-hidden overflow-y-scroll rounded-lg"
        >
            <div class="flex w-full justify-between text-white
                    items-center rounded sticky top-0 z-10"
                :style="{ backgroundColor: roleColor(player) }"
            >
                <div class="flex items-center space-x-0.5">
                    <div
                        v-if="player.activeTurn"
                        class="w-2 h-2 rounded-full bg-white ml-2"
                    />
                    <p class="pl-2 py-2 font-bold text-xs select-none">
                        {{ player.name }}
                    </p>
                </div>
                <role-popup :player="player" />
            </div>

            <playing-cards
                :player="player"
                :game="game"
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
        if (array?.length === 2) {
            this.performPlayerChanges(array);
            this.playersWithDeckUpdates = [];
        }
    }

    public activePlayer(player: Player): boolean {
        const current = auth.currentUser?.uid;
        return player.activeTurn && current === player.id;
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
            alteredPlayer.playingCards = action.newDeck.reverse();
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
