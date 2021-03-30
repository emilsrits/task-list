<template>
    <div class="color-picker">
        <div 
            v-for="(color, index) in colors" 
            :key="index" 
            :class="[{ 'is-active': isActiveColor(index) }, 'color']" 
            :style="{ background: color.code }"
            @click="handleColorPick(index)"
        ></div>
    </div>
</template>

<script>
import { SETTINGS } from '@config/const';

export default {
    name: 'ColorPicker',

    props: {
        activeColor: String
    },

    data () {
        return {
            colors: SETTINGS.COLORS,
        }
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
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@styles/variables.scss";

.color-picker {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;

    .color {
        margin-bottom: 4px;
        width: 20px;
        height: 20px;
        border: 1px solid $color-black;
        box-sizing: border-box;
        cursor: pointer;

        &:not(:last-child) {
            margin-right: 4px;
        }

        &.is-active {
            border: 2px solid $color-black;
        }
    }
}
</style>