<template>
    <div>
        <div class="task-panel">
            <form @submit="handleTaskSubmit">
                <input 
                    class="task-title-input" 
                    type="text" 
                    name="title" 
                    autocomplete="off"
                >
                <button 
                    class="icon-plus button button-add" 
                    type="submit"
                >
                </button>
            </form>
        </div>

        <div>
            <draggable 
                tag="ul" 
                :list="localTasks" 
                v-bind="getDragOptions" 
                @change="handleTaskListOrderChange"
            >
                <li 
                    v-for="(task, i) in localTasks" 
                    :key="i"
                >
                    <task-list-item :task="task"/>
                </li>
            </draggable>
        </div>
    </div>
</template>

<script>
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
            localTasks: this.$store.state.tasks
        }
    },

    computed: {
        getDragOptions() {
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

            let title = el.elements.title.value;
            if (title || title.length !== 0) {
                let task = {
                    title: el.elements.title.value
                }

                this.$store.dispatch('addTask', task);
            }

            el.elements.title.value = null;
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

.task-panel form {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    padding: 5px;
    background-color: rgba(20, 150, 90, 0.3);

    .task-title-input {
        margin-right: 5px;
        padding: 4px 8px;
        width: 100%;
        height: 22px;

        &:focus {
            outline: $color-black solid 2px;
        }

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
    margin: 5px 0 0;
}

.ghost {
    opacity: 0.5;
}
</style>