<template>
    <div
        :class="['task', { 'task-done': task.done }]"
        :style="styleColorLabel"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
    >
        <div class="task-panel">
            <div class="task-panel-left">
                <div class="checkbox">
                    <input
                        type="checkbox"
                        :id="task.id"
                        :name="task.id"
                        :checked="task.done"
                        @change="handleTaskCheck"
                    />
                    <label :for="task.id"></label>
                </div>
            </div>

            <div class="task-panel-right">
                <div class="task-header">
                    <h4 v-html="titleFormatted" class="task-title"></h4>

                    <transition name="slide-fade">
                        <div v-if="showActions" class="task-actions">
                            <button
                                class="icon-pencil2 button button-edit"
                                @click="handleTaskEdit"
                            ></button>
                            <button
                                v-if="showDelete"
                                class="icon-minus button button-delete"
                                @click="handleTaskDelete"
                            ></button>
                        </div>
                    </transition>
                </div>
            </div>
        </div>

        <div
            v-if="task.date && !task.done"
            :class="[{ 'is-due': isTaskDue }, 'task-date']"
        >
            <span class="icon icon-clock"></span>
            <span>{{ dateFormatted }}</span>
        </div>

        <div v-if="task.description" class="task-description">
            <p v-html="descriptionFormatted"></p>
        </div>

        <div :class="[{ 'is-visible': showHandle }, 'handle']">
            <span>&#8901;</span>
            <span>&#8901;</span>
            <span>&#8901;</span>
        </div>
    </div>
</template>

<script>
import { CONFIG } from '@config/const';
import { wrapLinks } from '@utils/helpers';
import { getOption } from '@utils/user-options';

export default {
    name: 'TaskListItem',

    props: ['task'],

    data() {
        return {
            showActions: false,
            showDelete: false,
            showHandle: false,
        };
    },

    computed: {
        titleFormatted() {
            return wrapLinks(this.task.title);
        },

        dateFormatted() {
            let options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            };
            let datetime = this.task.date;

            if (this.task.time) {
                options = { ...options, hour: '2-digit', minute: '2-digit' };
                datetime = `${this.task.date}T${this.task.time}`;
            }

            let date = new Date(datetime);

            return date.toLocaleDateString('en-GB', options);
        },

        isTaskDue() {
            const today = new Date();
            const due = new Date(this.task.date);

            const dateDifference = parseInt(
                (due - today) / (1000 * 60 * 60 * 24),
                10
            );

            return dateDifference < 1;
        },

        descriptionFormatted() {
            return wrapLinks(this.task.description);
        },

        styleColorLabel() {
            const taskColor = this.task.color
                ? this.task.color.toUpperCase()
                : null;

            if (CONFIG.COLORS.hasOwnProperty(taskColor)) {
                const colorHex = CONFIG.COLORS[taskColor].code;

                return {
                    borderLeft: `3px solid ${colorHex}`,
                };
            }

            return null;
        },
    },

    created() {
        getOption(CONFIG.OPTIONS.NAMES.QUICK_DELETE)
            .then(option => this.showDelete = option);
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

        handleTaskCheck() {
            this.task.done = !this.task.done;

            this.$store.dispatch('updateTask', this.task);
        },

        handleTaskEdit() {
            this.$store.dispatch('openTaskEdit', this.task);
        },

        handleTaskDelete() {
            this.$store.dispatch('deleteTask', this.task.id);
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@styles/_variables.scss';

.task {
    position: relative;
    padding: 5px 15px 2px;
    background: $color-background-lighter;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.6);
    transition: opacity 0.3s ease;

    &-panel {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        &-left {
            margin-right: 16px;
        }

        &-right {
            flex: 1 0 0;
        }
    }

    &-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: row;

        .task-actions {
            position: absolute;
            top: 4px;
            right: 4px;
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

    &-title {
        margin: 0;
        width: 100%;
        overflow-wrap: break-word;
    }

    &-description {
        margin: 2px 0 6px 36px;

        p {
            margin: 0;
            font-size: 14px;
            line-height: 1.4;
            white-space: pre-wrap;
            word-break: break-word;
        }
    }

    &-date {
        margin: 5px 0 8px 36px;
        color: $color-font-secondary;
        font-size: 11px;

        &.is-due {
            color: $color-red;
        }

        .icon {
            padding-right: 5px;
        }
    }

    &-done {
        .task-title,
        .task-description {
            text-decoration: line-through;
            opacity: 0.5;
        }
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
    transition: all 0.2s ease;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}
</style>