<template>
    <div :class="['container', { 'menu-open': isMenuOpen }]">
        <component :is="currentTab"></component>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
            if (mutation.type === 'OPEN_TASK_EDIT') {
                this.currentTab = TaskEdit;
            }

            if (mutation.type === 'OPEN_TASK_LIST') {
                this.currentTab = TaskList;
            }
        });
    },
};
</script>

<style lang="scss" scoped>
@import '@styles/_variables.scss';

.container {
    padding: 10px 14px;
    min-width: 520px;
    max-width: 520px;
    background: $color-background;

    &.menu-open {
        min-height: 160px;
    }
}
</style>