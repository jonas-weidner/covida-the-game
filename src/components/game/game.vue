<template>
    <div>
        {{ game }}
        <div class="left-sidebar text-center">
            <start-game v-if="game && !game.started" :game=game />
            <exit-game v-if="game && game.started" />
            <outbreaks v-if="game" :game=game />
            <infection-rate v-if="game" :game=game />
            <draw-playing-cards v-if="game" />
            <player-discard-pile v-if="game" :player-discard-pile="game.playerDiscardPile" />
        </div>
        <div class="board overflow-hidden">
            <board :game=game />
        </div>

        <div v-if="game" class="player-bar">
            <player-bar :game="game" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { database } from "@/services/firebase";
import ExitGame from "@/components/game/exitGame";
import StartGame from "@/components/game/startGame";
import Outbreaks from "@/components/game/outbreaks";
import InfectionRate from "@/components/game/infectionRate";
import Board from "@/components/game/board";
import PlayerBar from "@/components/game/playerBar";
import { Game } from "@/types";
import DrawPlayingCards from "@/components/game/drawPlayingCards";
import PlayerDiscardPile from "@/components/game/playerDiscardPile";

export default Vue.extend({
    components: {
        PlayerDiscardPile,
        DrawPlayingCards,
        ExitGame,
        StartGame,
        Outbreaks,
        InfectionRate,
        Board,
        PlayerBar
    },
    watch: {
        "$route.params.id": {
            immediate: true,
            deep: true,
            handler(id) {
                if (!this.$store.getters.getCurrentGameCode)
                    this.$store.commit("setCurrentGameCode", id);
                this.$bind("games",
                    database
                        .collection("games")
                        .where("gameCode", "==", id)
                        .limit(1)
                );
            }
        }
    },
    data() {
        return {
            games: null! as Game[],
            whatever: null
        };
    },
    computed: {
        game(): Game {
            if (this.games && this.games?.length > 0)
                return this.games[0] as Game;
            return null!;
        }
    }
});
</script>

<style scoped>
.left-sidebar {
    padding-top: 10px;
    padding-bottom: 10px;
    position: fixed;
    top: 10px;
    left: 10px;
    height: calc(80vh - 10px);
    width: 15vw;
}

.board {
    position: fixed;
    top: 10px;
    right: 10px;
    height: calc(80vh - 10px);
    width: calc(85vw - 30px);
    border: solid 3px black;
}

.player-bar {
    position: fixed;
    bottom: 10px;
    left: 10px;
    right: 10px;
    height: calc(20vh - 20px);
}
</style>
