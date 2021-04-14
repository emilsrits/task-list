<template>
    <form
        @submit.prevent="handleTaskUpdate"
        @change="handleInputChange"
        class="form"
    >
        <span class="form-label">Title</span>
        <input
            ref="title"
            type="text"
            name="title"
            :value="taskTitle"
            :maxlength="titleMax"
            autocomplete="off"
            spellcheck="false"
        />

        <span class="form-label">Date</span>
        <div class="input-group">
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

        <span class="form-label">Description</span>
        <textarea
            ref="description"
            name="description"
            cols="10"
            rows="6"
            :value="taskDescription"
            :maxlength="descriptionMax"
            spellcheck="false"
        ></textarea>

        <span class="form-label">Color label</span>
        <color-picker
            :active-color="taskActiveColor"
            @colorPicked="handleColorPicked"
        />

        <div class="form-action">
            <button
                class="icon-minus button button-delete"
                @click="handleTaskDelete"
            ></button>
            <span class="separator"></span>
            <button
                class="icon-undo2 button button-edit"
                type="button"
                @click="openTaskList"
            ></button>
            <button
                class="icon-floppy-disk button button-add"
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

.form {
    > * {
        margin: 0 0 10px;
        width: 100%;
    }

    &-label {
        color: $color-font;
        font-size: 14px;
        font-weight: bold;
        vertical-align: super;
    }

    &-action {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-direction: row;

        .button {
            margin-left: 10px;
        }
    }
}

.separator {
    &::before {
        content: "|";
        margin-left: 10px;
        color: $color-font-secondary;
    }
}

.button-delete {
    opacity: 0.3;
    transition: opacity 0.3s ease;

    &:hover {
        opacity: 1;
    }
}
</style>