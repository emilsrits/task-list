<template>
    <div class="container">
        <todo-list
            :todos="todos"/>
    </div>
</template>

<script>
import TodoList from './Todo/TodoList.vue';

export default {
    name: 'App',

    components: {
        TodoList
    },

    computed: {
        todos() {
            return {
                task1: {
                    title: 'Task 1'
                },
                task2: {
                    title: 'Task 2'
                },
                task3: {
                    title: 'Task 3'
                },
                task4: {
                    title: 'Task 4'
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    padding: 15px;
    min-width: 300px;
}
</style>