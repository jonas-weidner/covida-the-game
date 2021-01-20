import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentGameCode: null! as string,
        goToPlayer: null! as any,
        authorizedPlayers: [] as string[]
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
        }
    },
    actions: {},
    modules: {}
});
