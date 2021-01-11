import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: { currentGameCode: null! as string },
    getters: {
        getCurrentGameCode: (state): string => {
            return state.currentGameCode;
        }
    },
    mutations: {
        setCurrentGameCode(state, gameCode: string) {
            state.currentGameCode = gameCode;
        }
    },
    actions: {},
    modules: {}
});
