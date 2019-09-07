require('./bootstrap.js');

import Vue from 'vue';
import App from './components/App.vue';

Vue.config.productionTip = false;

const app = new Vue({
    components: {
        App
    },
    
    render: h => h(App)
}).$mount('#app');