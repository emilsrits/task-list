<template>
    <div :class="['l-container', { 'h-menu-is-open': isMenuOpen }]">
        <component :is="currentTab"></component>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as types from '@store/mutation-types';
import TaskList from '@components/Task/TaskList.vue';
import TaskEdit from '@components/Task/TaskEdit.vue';

export default {
    name: 'App',

    data() {
        return {
            currentTab: TaskList,
        };
    },

    computed: {
        ...mapGetters(['isMenuOpen']),
    },

    mounted() {
        this.$store.dispatch('setTaskList');

        this.$store.subscribe((mutation, state) => {
            if (mutation.type === types.OPEN_TASK_EDIT) {
                this.currentTab = TaskEdit;
            }

            if (mutation.type === types.OPEN_TASK_LIST) {
                this.currentTab = TaskList;
            }
        });
    },
};
</script>

<style lang="scss" scoped>
@import '@styles/_variables.scss';

.l-container {
    padding: 10px 14px;
    min-width: 520px;
    max-width: 520px;

    &.h-menu-is-open {
        min-height: 160px;
    }
}
</style>