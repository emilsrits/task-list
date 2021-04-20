import Vue from 'vue';
import Options from '@components/Options.vue';
import i18n from '@lang/i18n';

Vue.config.productionTip = false;
Vue.config.devtools = false;

new Vue({
    i18n,
    render: h => h(Options)
}).$mount('#options');