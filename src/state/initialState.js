export default {
    state: {
        routeName: null,
        stateString: null,
        user: null,
        languageCode: null,
        languageId: 0,
        data: null,
    },

    getters: {
        routeName(state) {
            return state.routeName;
        },
        stateString(state) {
            return state.stateString;
        },
        user(state) {
            return state.user;
        },
        languageCode(state) {
            return state.languageCode;
        },
        languageId(state) {
            return state.languageId;
        },
        data(state) {
            return state.data;
        },
    },

    mutations: {
        SET_STATE_STRING(state, value) {
            state.stateString = value;
        },
        SET_DATA(state, value) {
            state.data = value;
        },
    },

    actions: {
        mapInitialState({ state, commit, rootState }) {
            state.routeName = rootState.data.routeName;
            state.stateString = rootState.data.stateString;
            state.user = rootState.data.user;
            state.languageCode = rootState.data.languageCode;
            state.languageId = rootState.data.languageId;
            state.data = rootState.data.data;
        },
        updateStateString(context, value) {
            context.commit('SET_STATE_STRING', value);
        },
        updateData(context, value) {
            context.commit('SET_DATA', value);
        },
    }
};