<template>
    <form
        @submit.prevent="handleTaskUpdate"
        @change="handleInputChange"
        class="c-form"
    >
        <span class="c-form__label">{{ $t('task_edit.title') }}</span>
        <input
            ref="title"
            type="text"
            name="title"
            :value="taskTitle"
            :maxlength="titleMax"
            autocomplete="off"
            spellcheck="false"
        />

        <span class="c-form__label">{{ $t('task_edit.date') }}</span>
        <div class="c-form__group">
            <input
                ref="date"
                type="date"
                name="date"
                :min="minDateSelect"
                :value="taskDate"
            />
            <input 
                ref="time" 
                type="time" 
                name="time" 
                :value="taskTime"
            />
        </div>

        <span class="c-form__label">{{ $t('task_edit.description') }}</span>
        <textarea
            ref="description"
            class="c-form__text"
            name="description"
            cols="10"
            rows="6"
            :value="taskDescription"
            :maxlength="descriptionMax"
            spellcheck="false"
        ></textarea>

        <span class="c-form__label">{{ $t('task_edit.color_label') }}</span>
        <color-picker
            :active-color="taskActiveColor"
            @colorPicked="handleColorPicked"
        />

        <div class="c-form__action">
            <button
                class="icon icon--minus c-button c-button--delete"
                @click="handleTaskDelete"
            ></button>
            <span class="c-separator"></span>
            <button
                class="icon icon--undo2 c-button c-button--edit"
                type="button"
                @click="openTaskList"
            ></button>
            <button
                class="icon icon--floppy-disk c-button c-button--add"
                type="submit"
            ></button>
        </div>
    </form>
</template>

<script>
import { mapActions } from 'vuex';
import { CONFIG } from '@config/const';
import ColorPicker from '@components/Widgets/ColorPicker';

export default {
    name: 'TaskEdit',

    components: {
        ColorPicker,
    },

    data() {
        return {
            task: this.$store.state.task.currentTask,
            taskTitle: this.$store.state.task.currentTask.title,
            taskDate: this.$store.state.task.currentTask.date,
            taskTime: this.$store.state.task.currentTask.time,
            taskDescription: this.$store.state.task.currentTask.description,
            taskActiveColor: this.$store.state.task.currentTask.color,
            titleMax: CONFIG.INPUT_VALIDATE.TITLE.max,
            descriptionMax: CONFIG.INPUT_VALIDATE.DESCRIPTION.max,
        };
    },

    computed: {
        minDateSelect() {
            const date = new Date(new Date().getFullYear(), 0, 1);

            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const dd = String(date.getDate()).padStart(2, '0');

            return `${yyyy}-${mm}-${dd}`;
        },
    },

    methods: {
        ...mapActions(['openTaskList']),

        handleInputChange() {
            this.taskTitle = this.$refs.title.value.trim();
            this.taskDate = this.$refs.date.value;
            this.taskTime = this.$refs.time.value;
            this.taskDescription = this.$refs.description.value.trim();
        },

        handleColorPicked(color) {
            this.taskActiveColor = color;
        },

        handleTaskUpdate() {
            const titleLength = this.taskTitle.length;

            if (titleLength > 0 && titleLength <= this.titleMax) {
                this.task.title = this.taskTitle;
            }

            this.task.date = this.taskDate;
            this.task.time = this.taskTime;
            this.task.description = this.taskDescription;
            this.task.color = this.taskActiveColor;

            this.$store.dispatch('updateTask', this.task);
        },

        handleTaskDelete() {
            this.$store.dispatch('deleteTask', this.task.id);
            this.$store.dispatch('openTaskList');
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@styles/_variables.scss';

.c-form {
    > * {
        margin: 0 0 10px;
        width: 100%;
    }

    &__label {
        color: $color-font;
        font-size: 14px;
        font-weight: bold;
        vertical-align: super;
    }

    &__group {
        display: flex;
        flex-wrap: wrap;

        > *:not(:first-of-type) {
            margin-left: 10px;
        }
    }

    &__action {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-direction: row;

        .c-button {
            margin-left: 10px;
        }
    }

    &__text {
        font-size: 14px;
    }
}

.c-separator {
    &::before {
        content: '|';
        margin-left: 10px;
        color: $color-font-secondary;
    }
}

.c-button--delete {
    opacity: 0.3;
    transition: opacity 0.3s ease;

    &:hover {
        opacity: 1;
    }
}
</style>