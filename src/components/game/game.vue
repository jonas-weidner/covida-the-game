<template>
    <div>
        <div class="board overflow-hidden relative">
            <board :game=game />

            <player-discard-pile v-if="game" :game="game" />
            <outbreaks v-if="game" :game="game" />
            <infection-rate v-if="game" :game=game />

            <div class="game-button-wrapper">
                <start-game v-if="game && !game.started" :game=game />
                <exit-game v-if="game && game.started" />
            </div>

            <next-turn :game="game" />

            <div class="infection-wrapper flex justify-between items-end space-x-3">
                <draw-infection-card />
                <infection-discard-pile v-if="game" :discard-pile="game.infectionDiscardPile" />
            </div>
        </div>

        <div v-if="game" class="player-bar">
            <player-bar :game="game" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { database } from "@/services/firebase";
import ExitGame from "@/components/game/board/exitGame";
import StartGame from "@/components/game/board/startGame";
import Board from "@/components/game/board";
import PlayerBar from "@/components/game/playerBar";
import { Game } from "@/types";
import PlayerDiscardPile from "@/components/game/board/playerDiscardPile";
import InfectionDiscardPile from "@/components/game/board/infectionDiscardPile";
import Outbreaks from "@/components/game/board/outbreaks";
import InfectionRate from "@/components/game/board/infectionRate";
import DrawInfectionCard from "@/components/game/board/drawInfectionCard";
import NextTurn from "@/components/game/board/nextTurn";

export default Vue.extend({
    components: {
        NextTurn,
        InfectionDiscardPile,
        PlayerDiscardPile,
        ExitGame,
        StartGame,
        Board,
        PlayerBar,
        Outbreaks,
        InfectionRate,
        DrawInfectionCard
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
.game-button-wrapper {
    position: absolute;
    top: 3%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.infection-wrapper {
    position: absolute;
    bottom: 10px;
    right: 10px;
}

.board {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: calc(80vh - 10px);
    border-bottom: solid 3px black;
    background-color: #75A7CB;
}

.player-bar {
    position: fixed;
    bottom: 10px;
    left: 10px;
    right: 10px;
    height: calc(20vh - 20px);
}
</style>
