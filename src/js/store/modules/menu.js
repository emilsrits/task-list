import * as types from '@store/mutation-types';

const state = {
    isOpen: false
}

const getters = {
    isMenuOpen(state) {
        return state.isOpen;
    }
}

const actions = {
    toggleMenu(context) {
        context.commit(types.TOGGLE_MENU);
    },

    closeMenu(context) {
        context.commit(types.CLOSE_MENU);
    }
}

const mutations = {
    [types.TOGGLE_MENU](state) {
        state.isOpen = !state.isOpen;
    },

    [types.CLOSE_MENU](state) {
        state.isOpen = false;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};