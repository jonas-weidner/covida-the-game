import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentGameCode: null! as string,
        goToPlayer: null! as any
    },
    getters: {
        getCurrentGameCode: (state): string => {
            return state.currentGameCode;
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
        }
    },
    actions: {},
    modules: {}
});
