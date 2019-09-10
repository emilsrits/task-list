<template>
    <div class="container">
        <component
            :is="currentTab"
        ></component>
    </div>
</template>

<script>
import TaskList from './Task/TaskList.vue';

export default {
    name: 'App',

    data () {
        return {
            currentTab: TaskList
        }
    },

    mounted () {
        this.$store.dispatch('setTaskList');
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