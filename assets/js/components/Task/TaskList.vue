<template>
    <div>
        <div class="task-panel">
            <form @submit="handleTaskSubmit">
                <input class="task-title-input" type="text" name="title">
                <button class="icon-plus button button-add" type="submit"></button>
            </form>
        </div>

        <div>
            <ul>
                <li v-for="(task, i) in localTasks" :key="i">
                    <task-list-item
                        :task="task"/>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import TaskListItem from './TaskListItem.vue';

export default {
    name: 'TaskList',

    components: {
        TaskListItem
    },

    data () {
        return {
            localTasks: null
        }
    },

    methods: {
        handleTaskSubmit(event) {
            event.preventDefault();

            let el = event.target;
            let title = el.elements.title.value;

            if (title || title.length !== 0) {
                    let task = {
                    title: el.elements.title.value
                }

                this.$store.dispatch('addTask', task);
            }

            el.elements.title.value = null;
        }
    },

    mounted () {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'SET_TASK_LIST') {
                this.localTasks = state.tasks;
            }

            if (mutation.type === 'ADD_TASK') {
                this.localTasks = state.tasks;
            }
        });
    }
}
</script>

<style lang="scss" scoped>
@import "../../../sass/variables.scss";

.task-panel form {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    padding: 5px;
    background-color: rgba(20, 150, 90, 0.3);

    .task-title-input {
        margin-right: 5px;
        padding: 8px;
        width: 100%;
    }

    .button-add {
        padding: 8px;
    }
}

ul {
    padding: 0;
    list-style: none;
}

li {
    display: block;
    margin: 5px 0;
    padding: 5px 0;
}
</style>