import Vue from 'vue';
import App from './components/App.vue';

const app = new Vue({
    el: '#app',

    components: {
        App
    },
    
    render(h) {
        return h('app');
    }
});