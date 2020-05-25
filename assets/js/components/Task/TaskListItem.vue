<template>
    <div 
        :class="['item', { 'task-done': task.done }]" 
        @mouseenter="showActions = true" 
        @mouseleave="showActions = false"
    >
        <div class="item-header">
            <h4 class="task-title">{{ task.title }}</h4>

            <div class="task-actions">
                <transition name="slide-fade">
                    <div v-if="showActions">
                        <button 
                            class="icon-checkmark button button-check" 
                            type="button" 
                            @click="handleTaskCheck"
                        ></button>
                        <button 
                            class="icon-pencil2 button button-edit" 
                            type="button" 
                            @click="handleTaskEdit"
                        ></button>
                        <button 
                            class="icon-minus button button-delete" 
                            type="button" 
                            @click="handleTaskDelete"
                        ></button>
                    </div>
                </transition>
            </div>
        </div>

        <p 
            :class="[{ 'task-due': isTaskDue }, 'task-date']" 
            v-if="task.date && !task.done"
        >
            <span class="icon-clock"></span>
            {{ dateFormatted }}
        </p>

        <p 
            class="task-description" 
            v-if="task.description"
        >
            {{ task.description }}
        </p>
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

    computed: {
        dateFormatted() {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            let date = new Date(this.task.date);

            return date.toLocaleDateString('en-US', options);
        },

        dateDifference() {
            let today = new Date();
            let due = new Date(this.task.date);
            
            return parseInt((due - today) / (1000 * 60 * 60 * 24), 10);
        },

        isTaskDue() {
            return this.dateDifference < 2;
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

.item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: row;

    .task-actions {
        margin-left: 5px;
        width: 120px;
        text-align: right;

        .button {
            padding: 4px;
            font-size: 10px;
        }

    }
    
}

.task-title {
    width: 100%;
}

.task-date {
    padding: 5px 0;
    font-size: 0.7em;

    > span {
        padding-right: 5px;
    }

}

.task-due {
    color: $color-red;
}

.task-done {

    .task-title, .task-description {
        opacity: 0.5;
        text-decoration: line-through;
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