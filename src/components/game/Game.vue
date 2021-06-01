<template>
    <div>
        <splitpanes class="default-theme game-bg" horizontal>
            <pane :size="100 - paneSize" min-size="50" :class="boardClasses()">
                <board :game=Game />

                <outbreaks v-if="Game" :game="Game" />
                <infection-rate v-if="Game" :game=Game />

                <div class="game-button-wrapper rounded-r-lg flex flex-col space-y-2">
                    <start-game v-if="Game && !Game.started" :game=Game />
                    <exit-game v-if="Game && Game.started" />
                    <undo-button v-if="Game && Game.started" :game="Game" />
                    <next-turn v-if="Game && Game.started" :game="Game" />
                    <overview-modal v-if="Game && Game.started" :game="Game" />
                </div>

                <div class="playing-cards-wrapper rounded-tr-2xl shadow-2xl">
                    <h2 class="text-lg font-bold select-none text-center">
                        {{ $t('playerCards.playerCards') }}</h2>
                    <div class="flex justify-between items-end space-x-4">
                        <player-discard-pile v-if="Game" :game="Game" />
                        <playing-card-deck :game="Game" />
                    </div>
                </div>

                <div class="infection-wrapper rounded-tl-2xl shadow-2xl">
                    <h2 class="text-lg font-bold select-none text-center">
                        {{ $t('infections.infectionCards') }}</h2>
                    <div class="flex justify-between items-end space-x-4">
                        <draw-infection-card :game="Game" />
                        <infection-discard-pile
                            v-if="Game"
                            :game="Game"
                        />
                    </div>
                </div>

                <medicines :game="Game" />
            </pane>

            <pane :size="paneSize" min-size="15" v-if="Game" :class="playerBarClasses()">
                <player-bar :game="Game" />
            </pane>

        </splitpanes>
        <resize-button @resize="toggleResize" :expanded="expanded" />
        <your-turn-modal ref="yourTurnModal" />
        <you-won-modal :game="Game" />
    </div>
</template>

<script lang="ts">
import ExitGame from "@/components/game/board/exitGame";
import StartGame from "@/components/game/board/startGame";
import Board from "@/components/game/board";
import PlayerBar from "@/components/game/playerBar";
import { Game } from "@/interfaces";
import PlayerDiscardPile from "@/components/game/board/playerDiscardPile";
import InfectionDiscardPile from "@/components/game/board/infectionDiscardPile";
import Outbreaks from "@/components/game/board/outbreaks";
import InfectionRate from "@/components/game/board/infectionRate";
import DrawInfectionCard from "@/components/game/board/drawInfectionCard";
import NextTurn from "@/components/game/board/nextTurn";
import Medicines from "@/components/game/board/medicines";
import ResizeButton from "@/components/game/resizeButton";
import UndoButton from "@/components/game/board/undoButton";
import PlayingCardDeck from "@/components/game/board/playingCardDeck";
import { Vue, Component, Watch } from "vue-property-decorator";
import { auth, database } from "@/services/firebase";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import YourTurnModal from "@/components/game/yourTurnModal/YourTurnModal.vue";
import OverviewModal from "@/components/game/board/overviewModal/OverviewModal.vue";
import YouWonModal from "@/components/game/youWonModal/YouWonModal.vue";

@Component({
    components: {
        YouWonModal,
        OverviewModal,
        YourTurnModal,
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

    @Watch("Game.vue", { deep: true })
    onGameUpdate(game: Game, oldGame: Game) {
        const playerId = auth.currentUser?.uid;
        if (Game && oldGame && playerId) {
            const oldGamePlayer = oldGame.players.find((player) => player.id === playerId);
            const newGamePlayer = Game.players.find((player) => player.id === playerId);

            if (!oldGamePlayer?.activeTurn && newGamePlayer?.activeTurn)
                (this.$refs.yourTurnModal as YourTurnModal).open();
        }
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
