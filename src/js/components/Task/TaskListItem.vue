<template>
    <div 
        :class="['item', { 'task-done': task.done }]" 
        @mouseenter="handleMouseEnter" 
        @mouseleave="handleMouseLeave"
        :style="styleColorLabel"
    >
        <div class="item-panel">
            <div class="item-panel-left">
                <div class="checkbox">
                    <input 
                        type="checkbox" 
                        :id="task.id" 
                        :name="task.id" 
                        :checked="task.done"
                        @change="handleTaskCheck"
                    >
                    <label :for="task.id"></label>
                </div>
            </div>

            <div class="item-panel-right">
                <div class="item-header">
                    <h4 class="task-title">{{ task.title }}</h4>

                    <transition name="slide-fade">
                        <div v-if="showActions" class="task-actions">
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

                <p 
                    :class="[{ 'task-due': isTaskDue }, 'task-date']" 
                    v-if="task.date && !task.done"
                >
                    <span class="icon-clock"></span>
                    {{ dateFormatted }}
                </p>
            </div>
        </div>

        <p 
            class="task-description" 
            v-if="task.description"
            v-html="descriptionFormatted"
        ></p>

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

        descriptionFormatted() {
            return this.task.description.replace(/((https|http)?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
        },

        styleColorLabel() {
            if (Settings.COLORS.hasOwnProperty(this.task.color)) {
                let color = Settings.COLORS[this.task.color].code;

                return {
                    borderLeft: '3px solid ' + color
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
@import "@styles/variables.scss";

.item {
    position: relative;
    padding: 5px 15px 2px;
    background: $color-gray-lighter;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.6);
    transition: opacity 0.3s ease;
}

.item-panel {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
}

.item-panel-left {
    margin-right: 24px;
}

.item-panel-right {
    flex: 1 0 0;
}

.item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: row;


    .task-actions {
        position: absolute;
        top: 8px;
        right: 10px;
        padding: 4px;
        text-align: right;
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 3px;

        .button {
            padding: 4px;
            font-size: 10px;
        }
    }
}

.task-title {
    margin: 0 0 5px;
    width: 100%;
    overflow-wrap: break-word;
}

.task-description {
    margin: 2px 0 6px 44px; 
    font-size: 0.75em;
    line-height: 1.4;
    overflow-wrap: break-word;
}

.task-date {
    margin: 5px 0;
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
    transition: all .2s ease;
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