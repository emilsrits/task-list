<template>
    <div class="c-tasks">
        <div class="c-tasks__panel">
            <form @submit.prevent="handleTaskSubmit" class="c-tasks__form">
                <input
                    class="c-tasks__input"
                    type="text"
                    name="title"
                    autocomplete="off"
                    :maxlength="titleMax"
                />
                <button
                    class="icon icon--plus c-button c-button--add"
                    type="submit"
                ></button>
            </form>

            <menu-dropdown />
        </div>

        <div class="c-tasks__list">
            <template v-if="tasks.length">
                <draggable
                    tag="ul"
                    :list="tasks"
                    v-bind="dragOptions"
                    @change="updateTaskListOrder"
                    class="c-draggable-list"
                >
                    <li 
                        v-for="(task, i) in tasks" 
                        :key="i" 
                        class="c-draggable-list__item"
                    >
                        <task-list-item :task="task" />
                    </li>
                </draggable>
            </template>
            <template v-else>
                <div class="c-tasks__list-message">
                    <p>What your goal for today?</p>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
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
            titleMax: CONFIG.INPUT_VALIDATE.TITLE.max,
        };
    },

    computed: {
        ...mapState({ tasks: (state) => state.task.tasks }),

        dragOptions() {
            return {
                animation: 0,
                disabled: false,
                ghostClass: 'h-ghost',
                handle: '.js-handle',
            };
        },
    },

    methods: {
        ...mapActions(['updateTaskListOrder']),

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
    },
};
</script>

<style lang="scss" scoped>
@import '@styles/_variables.scss';

.c-tasks {
    &__panel {
        display: flex;
    }

    &__form {
        flex: 1 0 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        padding: 5px 0;
    }

    &__input {
        margin-right: 5px;
        padding: 3px 8px;
        width: 100%;
        height: 22px;
    }

    &__list-message {
        margin: 25px 0;

        p {
            margin: 0;
            color: $color-font-secondary;
            text-align: center;
        }
    }
}

.c-draggable-list {
    padding: 0;
    list-style: none;

    &__item {
        display: block;
        margin: 5px 0 0;
    }
}

.h-ghost {
    opacity: 0.5;
}
</style>