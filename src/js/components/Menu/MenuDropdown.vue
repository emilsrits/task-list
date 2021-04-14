<template>
    <div class="menu">
        <div @click="toggleMenu" :class="['menu-toggle', { open: isMenuOpen }]">
            <span>&#8942;</span>
        </div>

        <ul v-if="isMenuOpen" class="menu-list">
            <li @click="handleMenuOptions">Options</li>
        </ul>

        <div v-if="isMenuOpen" @click="closeMenu" class="menu-backdrop"></div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'MenuDropdown',

    computed: {
        ...mapGetters(['isMenuOpen']),
    },

    methods: {
        ...mapActions([
            'toggleMenu',
            'closeMenu'
        ]),

        handleMenuOptions() {
            chrome.runtime.openOptionsPage();
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@styles/_variables.scss';

.menu {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;

    &-toggle {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 8px;
        padding: 4px;
        color: $color-font-secondary;
        font-size: 18px;
        cursor: pointer;
        z-index: 25;

        &:hover,
        &.open {
            color: $color-font;
            background: $color-background-lighter;
        }

        > span {
            margin-bottom: 2px;
        }
    }

    &-list {
        position: absolute;
        top: 100%;
        right: 0;
        margin: 0;
        padding: 8px;
        min-width: 80px;
        border: 1px solid $color-black;
        background: $color-background;
        z-index: 30;

        li {
            list-style-type: none;
            cursor: pointer;

            &:hover {
                color: $color-green;
            }
        }
    }

    &-backdrop {
        position: fixed;
        top: 0;
        right: 0;
        width: 100vw;
        height: 100vh;
        background: rgba($color-black, 0.6);
        z-index: 20;
    }
}
</style>