import Vue from "vue";
import Vuex from "vuex";
import { Game } from "@/interfaces";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentGameCode: null! as string,
        goToPlayer: null! as any,
        authorizedPlayers: [] as string[],
        game: null! as Game,
        modalOpen: false
    },
    getters: {
        getCurrentGameCode: (state): string => {
            return state.currentGameCode;
        },
        getAuthorizedPlayers: (state): string[] => {
            return state.authorizedPlayers;
        },
        getGoToPlayer: (state): any => {
            return state.goToPlayer;
        },
        getGame: (state): Game => {
            return state.game;
        },
        getModalState: (state): boolean => {
            return state.modalOpen;
        }
    },
    mutations: {
        setCurrentGameCode(state, gameCode: string) {
            state.currentGameCode = gameCode;
        },
        setGoToPlayer(state, location: { top: number; left: number }) {
            state.goToPlayer = location;
        },
        setAuthorizedPlayers(state, players) {
            state.authorizedPlayers = players;
        },
        setGame(state, game: Game) {
            state.game = game;
        },
        setModalState(state, open: boolean) {
            state.modalOpen = open;
        }
    },
    actions: {},
    modules: {}
});
