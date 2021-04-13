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
        context.commit('TOGGLE_MENU');
    },

    closeMenu(context) {
        context.commit('CLOSE_MENU');
    }
}

const mutations = {
    TOGGLE_MENU(state) {
        state.isOpen = !state.isOpen;
    },

    CLOSE_MENU(state) {
        state.isOpen = false;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}