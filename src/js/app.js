import Vue from 'vue';
import App from './components/App.vue';
import store from './store/index.js';

Vue.config.productionTip = false;
Vue.config.devtools = false;

const app = new Vue({
    store,
    render: h => h(App)
}).$mount('#app');