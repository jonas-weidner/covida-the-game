import Vue from "vue";
import Vuex from "vuex";
import { Game } from "@/types";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentGameCode: null! as string,
        goToPlayer: null! as any,
        authorizedPlayers: [] as string[],
        game: null! as Game
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
        }
    },
    actions: {},
    modules: {}
});
