<template>
    <div class="task-list">
        <div class="task-panel">
            <form @submit.prevent="handleTaskSubmit" class="task-form">
                <input
                    class="task-form-input"
                    type="text"
                    name="title"
                    autocomplete="off"
                    :maxlength="titleMax"
                />
                <button
                    class="icon-plus button button-add"
                    type="submit"
                ></button>
            </form>

            <menu-dropdown />
        </div>

        <div class="tasks">
            <template v-if="localTasks.length">
                <draggable
                    tag="ul"
                    :list="localTasks"
                    v-bind="dragOptions"
                    @change="handleTaskListOrderChange"
                >
                    <li v-for="(task, i) in localTasks" :key="i">
                        <task-list-item :task="task" />
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
import { CONFIG } from '@config/const';
import draggable from 'vuedraggable';
import MenuDropdown from '@components/Menu/MenuDropdown.vue';
import TaskListItem from '@components/Task/TaskListItem.vue';

export default {
    name: 'TaskList',

    components: {
        draggable,
        MenuDropdown,
        TaskListItem,
    },

    data() {
        return {
            localTasks: this.$store.state.tasks,
            titleMax: CONFIG.INPUT_VALIDATE.TITLE.max,
        };
    },

    computed: {
        dragOptions() {
            return {
                animation: 0,
                disabled: false,
                ghostClass: 'ghost',
                handle: '.handle',
            };
        },
    },

    mounted() {
        this.$store.subscribe((mutation, state) => {
            if (
                mutation.type === 'SET_TASK_LIST' ||
                mutation.type === 'ADD_TASK'
            ) {
                this.localTasks = state.tasks;
            }
        });
    },

    methods: {
        handleTaskSubmit(event) {
            const el = event.target;

            const title = el.elements.title.value.trim();
            const titleLength = title.length;

            if (titleLength > 0 && titleLength <= this.titleMax) {
                const task = {
                    title: el.elements.title.value,
                };

                this.$store.dispatch('addTask', task);

                el.elements.title.value = null;
            }
        },

        handleTaskListOrderChange() {
            this.$store.dispatch('updateTaskListOrder');
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@styles/_variables.scss';

.task-panel {
    display: flex;

    .task-form {
        flex: 1 0 0;
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
}

.tasks-none {
    margin: 25px 0;

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