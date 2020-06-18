<template>
    <div 
        :class="['item', { 'task-done': task.done }]" 
        @mouseenter="handleMouseEnter" 
        @mouseleave="handleMouseLeave"
    >
        <div 
            class="item-header" 
            :style="styleColorLabel"
        >
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

        <div :class="[{ 'is-visible': showHandle }, 'handle']">
            <span>&#8901;</span>
            <span>&#8901;</span>
            <span>&#8901;</span>
        </div>
    </div>
</template>

<script>
import { Settings } from '@config/const';

export default {
    name: 'TaskListItem',

    props: ['task'],

    data () {
        return {
            showActions: false,
            showHandle: false
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
        },

        styleColorLabel() {
            if (Settings.COLORS.hasOwnProperty(this.task.color)) {
                let color = Settings.COLORS[this.task.color].code;

                return {
                    borderLeft: '6px solid ' + color
                }
            }

            return null;
        }
    },

    methods: {
        handleMouseEnter() {
            this.showActions = true;
            this.showHandle = true;
        },

        handleMouseLeave() {
            this.showActions = false;
            this.showHandle = false;
        },

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
    position: relative;
    padding: 2px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.6);
    transition: opacity 0.3s ease;
}

.item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: row;
    margin-bottom: 6px;
    padding: 2px 0 2px 4px;
    min-height: 22px;

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
    margin: 0;
    width: 100%;
    max-width: 220px;
    overflow-wrap: break-word;
}

.task-description {
    width: 100%;
    overflow-wrap: break-word;
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

    .task-title, 
    .task-description {
        text-decoration: line-through;
        opacity: 0.5;
    }

}

.handle {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 80px;
    height: 10px;
    transition: opacity 0.3s ease;
    cursor: grab;

    &:not(.is-visible) {
        opacity: 0;
    }

    span {
        line-height: 10px;
    }

}

.slide-fade-enter-active {
    transition: all .3s ease;
}

.slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, 
.slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}
</style>