<template>
    <div>
        <div class="task-panel">
            <form @submit="handleTaskSubmit">
                <input class="task-title-input" type="text" name="title">
                <button class="icon-plus button button-add" type="submit"></button>
            </form>
        </div>

        <div>
            <ul v-for="(task, i) in localTasks" :key="i">
                <li>
                    <task-list-item
                        :task="task"/>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

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

    .task-title-input {
        margin-right: 10px;
        padding: 8px;
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
    padding: 5px 0;
}
</style>