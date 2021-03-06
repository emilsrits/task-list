<template>
    <div>
        <div class="task-panel">
            <form @submit="handleTaskSubmit" class="task-form">
                <input 
                    class="task-form-input" 
                    type="text" 
                    name="title" 
                    autocomplete="off"
                    :maxlength="titleMax"
                >
                <button 
                    class="icon-plus button button-add" 
                    type="submit"
                >
                </button>
            </form>
        </div>

        <div class="tasks">
            <template v-if="localTasks.length">
                <draggable 
                    tag="ul" 
                    :list="localTasks" 
                    v-bind="dragOptions" 
                    @change="handleTaskListOrderChange"
                >
                    <li 
                        v-for="(task, i) in localTasks" 
                        :key="i"
                    >
                        <task-list-item :task="task"/>
                    </li>
                </draggable>
            </template>
            <template v-else>
                <div class="tasks-none">
                    <p>What your goal for today?</p>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { Settings } from '@config/const';
import draggable from 'vuedraggable';
import TaskListItem from '@components/Task/TaskListItem.vue';

export default {
    name: 'TaskList',

    components: {
        draggable,
        TaskListItem
    },

    data () {
        return {
            localTasks: this.$store.state.tasks,
            titleMax: Settings.INPUT_VALIDATE.title.max
        }
    },

    computed: {
        dragOptions() {
            return {
                animation: 0,
                disabled: false,
                ghostClass: 'ghost',
                handle: '.handle'
            }
        }
    },

    methods: {
        handleTaskSubmit(event) {
            event.preventDefault();

            let el = event.target;

            let title = el.elements.title.value.trim();
            let titleLength = title.length;

            if (titleLength > 0 && titleLength <= this.titleMax) {
                let task = {
                    title: el.elements.title.value
                }

                this.$store.dispatch('addTask', task);

                el.elements.title.value = null;
            }
        },

        handleTaskListOrderChange() {
            this.$store.dispatch('updateTaskListOrder');
        },
    },

    mounted () {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'SET_TASK_LIST' || mutation.type === 'ADD_TASK') {
                this.localTasks = state.tasks;
            }
        });
    }
}
</script>

<style lang="scss" scoped>
@import "@styles/variables.scss";

.task-form {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    padding: 5px 0;

    &-input {
        margin-right: 5px;
        padding: 3px 8px;
        width: 100%;
        height: 22px;
    }
}

.tasks-none {
    margin: 20px 0;

    p {
        margin: 0;
        color: $color-font-secondary;
        text-align: center;
    }
}

ul {
    padding: 0;
    list-style: none;
}

li {
    display: block;
    margin: 5px 0 0;
}

.ghost {
    opacity: 0.5;
}
</style>