import Vue from 'vue';
import VueI18n from 'vue-i18n';
import langEn from './en.json';

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en: langEn
    }
});

export default i18n;