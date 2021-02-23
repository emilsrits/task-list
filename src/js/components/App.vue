<template>
    <div class="container">
        <component :is="currentTab"></component>
    </div>
</template>

<script>
import TaskList from '@components/Task/TaskList.vue';
import TaskEdit from '@components/Task/TaskEdit.vue';

export default {
    name: 'App',

    data () {
        return {
            currentTab: TaskList
        }
    },

    mounted () {
        this.$store.dispatch('setTaskList');

        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'OPEN_TASK_EDIT') {
                this.currentTab = TaskEdit;
            }

            if (mutation.type === 'OPEN_TASK_LIST') {
                this.currentTab = TaskList;
            }
        });
    }
}
</script>

<style lang="scss" scoped>
@import "@styles/variables.scss";

.container {
    padding: 12px 16px;
    min-width: 480px;
    max-width: 480px;
    background: $color-background;
}
</style>