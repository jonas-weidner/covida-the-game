<template>
    <div class="game-bg">
        <div :class="boardClasses()">
            <board :game=game />

            <player-discard-pile v-if="game" :game="game" />
            <outbreaks v-if="game" :game="game" />
            <infection-rate v-if="game" :game=game />

            <div class="game-button-wrapper">
                <start-game v-if="game && !game.started" :game=game />
<!--                <exit-game v-if="game && game.started" />-->
            </div>

<!--            <next-turn :game="game" />-->

            <div class="infection-wrapper rounded-tl-2xl shadow-2xl
                   flex justify-between items-end space-x-3">
                <draw-infection-card :game="game" />
                <infection-discard-pile v-if="game" :discard-pile="game.infectionDiscardPile" />
            </div>

<!--            <medicines :game="game" />-->
        </div>

        <div v-if="game" :class="playerBarClasses()">
            <player-bar :game="game" />
        </div>

        <resize-button @resize="toggleResize" :expanded="expanded" />
        <undo-button :game="game" />
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
import UndoButton from "@/components/game/undoButton";
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
        DrawInfectionCard,
        UndoButton
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
        if (this.games && this.games?.length > 0) {
            this.$store.commit("setGame", this.games[0]);
            return this.games[0];
        }
        return null!;
    }

    public boardClasses(): string {
        return `board overflow-hidden relative shadow-inner flex justify-center items-center
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
.game-bg {
    height: 100vh;
    width: 100vw;
    background-color: #EBF0FC;
}

.game-button-wrapper {
    position: absolute;
    top: 3%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.infection-wrapper {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 10px;
    background-color: #EBF0FC;
}

.board {
    position: fixed;
    top: 15px;
    right: 15px;
    left: 15px;
    -webkit-transition: height 0.3s;
    -moz-transition: height 0.3s;
    -ms-transition: height 0.3s;
    -o-transition: height 0.3s;
    transition: height 0.3s;
}

.board-small {
    height: calc(60vh - 25px) !important;
}

.board-tall {
    height: calc(80vh - 25px) !important;
}

.player-bar {
    position: fixed;
    bottom: 10px;
    left: 10px;
    right: 10px;
    height: calc(20vh - 10px);
    -webkit-transition: height 0.3s;
    -moz-transition: height 0.3s;
    -ms-transition: height 0.3s;
    -o-transition: height 0.3s;
    transition: height 0.3s;
}

.player-bar-small {
    height: calc(20vh - 10px) !important;
}

.player-bar-tall {
    height: calc(40vh - 10px) !important;
}
</style>
