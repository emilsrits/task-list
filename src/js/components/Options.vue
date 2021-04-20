<template>
    <div class="l-container">
        <header>
            <h1>{{ $t('options.header_title') }}</h1>
        </header>

        <hr>

        <main>
            <options-main @savedOptions="showMessage" />

            <hr>
            
            <options-file @importedFile="showMessage" />

            <div ref="status" class="c-status"></div>
        </main>
    </div>
</template>

<script>
import OptionsFile from '@components/Options/OptionsFile.vue';
import OptionsMain from '@components/Options/OptionsMain.vue';

export default {
    name: 'Options',

    components: {
        OptionsFile,
        OptionsMain
    },

    methods: {
        showMessage(message) {
            if (!message) return;

            const CLASS_VISIBLE = 'c-status--visible';

            const status = this.$refs.status;

            status.classList.add(CLASS_VISIBLE);
            status.textContent = message;

            setTimeout(() => {
                status.textContent = '';
                status.classList.remove(CLASS_VISIBLE);
            }, 2000);
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@styles/_variables.scss';

.c-status {
    position: fixed;
    bottom: 5%;
    right: 5%;
    display: none;

    &--visible {
        display: inline-flex;
        padding: 10px;
        border: 1px solid $color-black;
        background: $color-blue;
    }
}
</style>