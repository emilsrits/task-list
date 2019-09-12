<template>
    <div class="container">
        <component
            :is="currentTab"
        ></component>
    </div>
</template>

<script>
import TaskList from './Task/TaskList.vue';
import TaskEdit from './Task/TaskEdit.vue';

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
.container {
    padding: 20px;
    min-width: 320px;
    max-width: 320px;
}
</style>