import Vue from 'vue';
import App from '@components/App.vue';
import store from '@store/index';
import i18n from '@lang/i18n';

Vue.config.productionTip = false;
Vue.config.devtools = false;

new Vue({
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');