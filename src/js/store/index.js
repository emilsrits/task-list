import Vue from 'vue';
import Vuex from 'vuex';
import menu from './modules/menu';
import task from './modules/task';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        menu,
        task
    }
});