<template>
    <div class="c-color-picker">
        <div
            v-for="(color, index) in colors"
            :key="index"
            :class="['c-color-picker__item', { 'c-color-picker__item--active': isActiveColor(index) }]"
            :style="{ background: color.code }"
            @click="handleColorPick(index)"
        ></div>
    </div>
</template>

<script>
import { CONFIG } from '@config/const';

export default {
    name: 'ColorPicker',

    props: {
        activeColor: String,
    },

    data() {
        return {
            colors: CONFIG.COLORS,
        };
    },

    methods: {
        isActiveColor(color) {
            return color === this.activeColor;
        },

        handleColorPick(color) {
            let chosenColor = color;

            if (this.activeColor === color) {
                chosenColor = null;
            }

            this.$emit('colorPicked', chosenColor);
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@styles/_variables.scss';

.c-color-picker {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;

    &__item {
        margin-bottom: 4px;
        width: 20px;
        height: 20px;
        border: 1px solid $color-black;
        box-sizing: border-box;
        cursor: pointer;

        &:not(:last-child) {
            margin-right: 4px;
        }

        &--active {
            border: 3px solid $color-black;
        }
    }
}
</style>