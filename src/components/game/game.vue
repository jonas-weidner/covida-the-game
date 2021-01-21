<template>
    <div>
        <div :class="boardClasses()">
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
                <draw-infection-card :game="game" />
                <infection-discard-pile v-if="game" :discard-pile="game.infectionDiscardPile" />
            </div>

            <medicines :game="game" />
        </div>

        <div v-if="game" :class="playerBarClasses()">
            <player-bar :game="game" />
        </div>

        <resize-button @resize="toggleResize" :expanded="expanded" />
    </div>
</template>

<script lang="ts">
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
import Medicines from "@/components/game/board/medicines";
import ResizeButton from "@/components/game/resizeButton";
import { Vue, Component, Watch } from "vue-property-decorator";
import { database } from "@/services/firebase";

@Component({
    components: {
        ResizeButton,
        Medicines,
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
    }
})
export default class MainGame extends Vue {
    @Watch("$route.params.id", { immediate: true })
    onRouteParams(id: string) {
        if (!this.$store.getters.getCurrentGameCode)
            this.$store.commit("setCurrentGameCode", id);
        this.$bind("games",
            database
                .collection("games")
                .where("gameCode", "==", id)
                .limit(1)
        );
    }

    public games: Game[] = null!;
    public expanded = false;

    get game(): Game {
        if (this.games && this.games?.length > 0)
            return this.games[0] as Game;
        return null!;
    }

    public boardClasses(): string {
        return `board overflow-hidden relative
            ${this.expanded ? "board-small" : "board-tall"}`;
    }

    public playerBarClasses(): string {
        return `player-bar ${this.expanded ? "player-bar-tall" : "player-bar-small"}`;
    }

    public toggleResize() {
        this.expanded = !this.expanded;
    }
}
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
    border-bottom: solid 3px black;
    background-color: #54738E;
    -webkit-transition: height 1s;
    -moz-transition: height 1s;
    -ms-transition: height 1s;
    -o-transition: height 1s;
    transition: height 1s;
}

.board-small {
    height: calc(60vh - 10px) !important;
}

.board-tall {
    height: calc(80vh - 10px) !important;
}

.player-bar {
    position: fixed;
    bottom: 10px;
    left: 10px;
    right: 10px;
    height: calc(20vh - 20px);
    -webkit-transition: height 1s;
    -moz-transition: height 1s;
    -ms-transition: height 1s;
    -o-transition: height 1s;
    transition: height 1s;
}

.player-bar-small {
    height: calc(20vh - 20px) !important;
}

.player-bar-tall {
    height: calc(40vh - 20px) !important;
}
</style>
