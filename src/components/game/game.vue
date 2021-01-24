<template>
    <div>
        <splitpanes class="default-theme game-bg" horizontal>
            <pane :size="100 - paneSize" min-size="50" :class="boardClasses()">
                <board :game=game />

                <outbreaks v-if="game" :game="game" />
                <infection-rate v-if="game" :game=game />

                <div class="game-button-wrapper rounded-r-lg flex flex-col space-y-2">
                    <start-game v-if="game && !game.started" :game=game />
                    <exit-game v-if="game && game.started" />
                    <undo-button v-if="game && game.started" :game="game" />
                    <next-turn v-if="game && game.started" :game="game" />
                </div>

                <div class="playing-cards-wrapper rounded-tr-2xl shadow-2xl">
                    <h2 class="text-lg font-bold select-none text-center">Spielerkarten</h2>
                    <div class="flex justify-between items-end space-x-4">
                        <player-discard-pile v-if="game" :game="game" />
                        <playing-card-deck :game="game" />
                    </div>
                </div>

                <div class="infection-wrapper rounded-tl-2xl shadow-2xl">
                    <h2 class="text-lg font-bold select-none text-center">Infektionskarten</h2>
                    <div class="flex justify-between items-end space-x-4">
                        <draw-infection-card :game="game" />
                        <infection-discard-pile
                            v-if="game"
                            :game="game"
                        />
                    </div>
                </div>

                <medicines :game="game" />
            </pane>

            <pane :size="paneSize" min-size="15" v-if="game" :class="playerBarClasses()">
                <player-bar :game="game" />
            </pane>

        </splitpanes>
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
import UndoButton from "@/components/game/undoButton";
import PlayingCardDeck from "@/components/game/board/playingCardDeck";
import { Vue, Component, Watch } from "vue-property-decorator";
import { database } from "@/services/firebase";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

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
        UndoButton,
        Splitpanes,
        Pane,
        PlayingCardDeck
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
    public paneSize = 20;

    get game(): Game {
        if (this.games && this.games?.length > 0) {
            this.$store.commit("setGame", this.games[0]);
            return this.games[0];
        }
        return null!;
    }

    public boardClasses(): string {
        return `overflow-hidden relative shadow-inner flex justify-center items-center`;
    }

    public playerBarClasses(): string {
        return "player-bar";
    }

    public toggleResize() {
        if (this.expanded) this.paneSize = 20;
        else this.paneSize = 50;
        this.expanded = !this.expanded;
    }
}
</script>

<style>
.game-bg {
    height: 100vh;
    width: 100vw;
    background-color: #EBF0FC;
    padding: 10px;
}

.game-button-wrapper {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0%, -50%);
    padding: 8px;
    background-color: #EBF0FC;
}

.infection-wrapper {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 10px;
    background-color: #EBF0FC;
}

.playing-cards-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 10px;
    background-color: #EBF0FC;
}

.player-bar {
    padding-top: 10px;
    background-color: #EBF0FC !important;
}

.splitpanes__splitter:before {
    border: solid 1px #02225c;
}

.splitpanes__splitter:after {
    background-color: #02225c;
    border: solid 1px #02225c;
}

.splitpanes--horizontal > .splitpanes__splitter {
    min-height: 15px;
    padding: 4px;
    background-color: #EBF0FC !important;
}
</style>
