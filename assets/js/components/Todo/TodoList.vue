<template>
    <div>
        <ul v-for="(todo, i) in localTodos" :key="i">
            <li>{{ todo.title }}</li>
        </ul>

        <button class="todo-add icon-plus" ref="todoAdd"></button>
    </div>
</template>

<script>
export default {
    name: 'TodoList',

    props: ['todos'],

    data: function () {
        return {
            localTodos: this.todos
        }
    }
}
</script>

<style lang="scss" scoped>
ul {
    padding: 0;
    list-style: none;
}

li {
    padding: 5px 0;
}

.todo-add {
    padding: 10px;
    width: 100%;
    background-color: #0aaa67;
    border: 3px solid transparent;
    box-shadow: inset #6b6e70 0 1px 20px 2px;
    &:hover {
        box-shadow: inset #434444 0 1px 20px 2px;
    }
}
</style>