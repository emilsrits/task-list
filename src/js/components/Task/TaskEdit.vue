<template>
    <form 
        @submit="handleTaskUpdate" 
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
        >

        <span class="form-label">Date</span>
        <div class="input-group">
            <input 
                ref="date"
                type="date" 
                name="date" 
                :min="minDateSelect"
                :value="taskDate"
            >
            <input 
                ref="time"
                type="time" 
                name="time"
                :value="taskTime"
            >
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
                class="icon-undo2 button button-edit" 
                type="button" 
                @click="handleShowTasks"
            ></button>
            <button 
                class="icon-floppy-disk button button-add" 
                type="submit"
            ></button>
        </div>
    </form>
</template>

<script>
import { Settings } from '@config/const';
import ColorPicker from '@components/Widgets/ColorPicker';

export default {
    name: 'TaskEdit',

    components: {
        ColorPicker
    },

    data () {
        return {
            task: this.$store.state.currentTask,
            taskTitle: this.$store.state.currentTask.title,
            taskDate: this.$store.state.currentTask.date,
            taskTime: this.$store.state.currentTask.time,
            taskDescription: this.$store.state.currentTask.description,
            taskActiveColor: this.$store.state.currentTask.color,
            titleMax: Settings.INPUT_VALIDATE.title.max,
            descriptionMax: Settings.INPUT_VALIDATE.description.max
        }
    },

    computed: {
        minDateSelect() {
            const date = new Date(new Date().getFullYear(), 0, 1);

            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, "0");
            const dd = String(date.getDate()).padStart(2, "0");

            return `${yyyy}-${mm}-${dd}`;
        }
    },

    methods: {
        handleShowTasks(event) {
            this.$store.dispatch('openTaskList');
        },

        handleInputChange(event) {
            this.taskTitle = this.$refs.title.value.trim();
            this.taskDate = this.$refs.date.value;
            this.taskTime = this.$refs.time.value;
            this.taskDescription = this.$refs.description.value.trim();
        },

        handleColorPicked(color) {
            this.taskActiveColor = color;
        },

        handleTaskUpdate(event) {
            event.preventDefault();

            const titleLength = this.taskTitle.length;
            if (titleLength > 0 && titleLength <= this.titleMax) {
                this.task.title = this.taskTitle;
            }

            this.task.date = this.taskDate;
            this.task.time = this.taskTime;
            this.task.description = this.taskDescription;
            this.task.color = this.taskActiveColor;

            this.$store.dispatch('updateTask', this.task);
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@styles/variables.scss";

.form {
    > * {
        margin: 0 0 10px;
        width: 100%;
    }

    &-label {
        color: $color-font;
        font-size: 0.8em;
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
</style>