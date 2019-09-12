<template>
    <div :class="['item', { 'task-done': task.done }]" @mouseenter="showActions = true" @mouseleave="showActions = false">
        <div class="item-header">
            <h4>{{ task.title }}</h4>

            <div class="task-actions">
                <transition name="slide-fade">
                    <div v-if="showActions">
                        <button class="icon-checkmark button button-check" @click="handleTaskCheck"></button>
                        <button class="icon-pencil2 button button-edit" @click="handleTaskEdit"></button>
                        <button class="icon-minus button button-delete" @click="handleTaskDelete"></button>
                    </div>
                </transition>
            </div>
        </div>
        <p v-if="task.description">{{ task.description }}</p>
    </div>
</template>

<script>
export default {
    name: 'TaskListItem',

    props: ['task'],

    data () {
        return {
            showActions: false
        }
    },

    methods: {
        handleTaskCheck(event) {
            this.task.done = !this.task.done;

            this.$store.dispatch('updateTask', this.task);
        },

        handleTaskEdit(event) {
            this.$store.dispatch('openTaskEdit', this.task);
        },

        handleTaskDelete(event) {
            this.$store.dispatch('deleteTask', this.task.id);
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../../sass/variables.scss";

.item {
    padding: 5px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.6);
    transition: opacity 0.3s ease;
}

.task-done {
    opacity: 0.5;

    h4, p {
        text-decoration: line-through;
    }
}

.item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: row;
}

h4 {
    width: 100%;
}

.task-actions {
    margin-left: 5px;
    width: 120px;
    text-align: right;

    .button-check, .button-edit, .button-delete {
        padding: 4px;
        font-size: 10px;
    }
}

.slide-fade-enter-active {
    transition: all .3s ease;
}

.slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to{
    transform: translateX(10px);
    opacity: 0;
}
</style>