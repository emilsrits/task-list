<template>
    <div
        :class="['c-task', { 'c-task--done': task.done }]"
        :style="styleColorLabel"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
    >
        <div class="c-task__panel">
            <div class="c-task__panel--left">
                <div class="c-checkbox">
                    <input
                        :id="task.id"
                        class="c-checkbox__input"
                        :name="task.id"
                        type="checkbox"
                        :checked="task.done"
                        @change="handleTaskCheck"
                    />
                    <label class="c-checkbox__label" :for="task.id"></label>
                </div>
            </div>

            <div class="c-task__panel--right">
                <div class="c-task__header">
                    <h4 v-html="titleFormatted" class="c-task__title"></h4>

                    <transition name="h-slide-fade">
                        <div v-if="showActions" class="c-task__actions">
                            <button
                                class="icon icon--pencil2 c-button c-button--edit"
                                @click="handleTaskEdit"
                            ></button>
                            <button
                                v-if="showDelete"
                                class="icon icon--minus c-button c-button--delete"
                                @click="handleTaskDelete"
                            ></button>
                        </div>
                    </transition>
                </div>
            </div>
        </div>

        <div
            v-if="task.date && !task.done"
            :class="[{ 'c-task__date--due': isTaskDue }, 'c-task__date']"
        >
            <span class="icon icon--clock"></span>
            <span>{{ dateFormatted }}</span>
        </div>

        <div v-if="task.description" class="c-task__description">
            <p v-html="descriptionFormatted"></p>
        </div>

        <div :class="['c-task__handle js-handle', { 'c-task__handle--visible': showHandle }]">
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
        getOption(CONFIG.OPTIONS.NAMES.QUICK_DELETE).then(
            (option) => (this.showDelete = option)
        );
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

.c-task {
    $self: &;
    position: relative;
    padding: 5px 15px 2px;
    background: $color-background-lighter;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.6);
    transition: opacity 0.3s ease;

    &--done {
        #{$self}__title,
        #{$self}__description {
            text-decoration: line-through;
            opacity: 0.5;
        }
    }

    &__panel {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        &--left {
            margin-right: 16px;
        }

        &--right {
            flex: 1 0 0;
        }
    }

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: row;
    }

    &__actions {
        position: absolute;
        top: 4px;
        right: 4px;
        padding: 4px;
        text-align: right;
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 3px;

        .c-button {
            padding: 4px;
            font-size: 10px;
        }
    }

    &__title {
        margin: 0;
        width: 100%;
        overflow-wrap: break-word;
    }

    &__description {
        margin: 2px 0 6px 36px;

        p {
            margin: 0;
            font-size: 14px;
            line-height: 1.4;
            white-space: pre-wrap;
            word-break: break-word;
        }
    }

    &__date {
        margin: 5px 0 8px 36px;
        color: $color-font-secondary;
        font-size: 11px;

        &--due {
            color: $color-red;
        }

        .icon {
            padding-right: 5px;
        }
    }

    &__handle {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        width: 80px;
        height: 10px;
        transition: opacity 0.3s ease;
        cursor: grab;
        user-select: none;

        &:not(&--visible) {
            opacity: 0;
        }

        span {
            line-height: 10px;
        }
    }
}

.h-slide-fade-enter-active {
    transition: all 0.2s ease;
}

.h-slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.h-slide-fade-enter,
.h-slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}
</style>