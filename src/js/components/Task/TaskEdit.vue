<template>
    <form 
        @submit="handleTaskUpdate" 
        @change="handleInputChange"
    >
        <span class="label">Title</span>
        <input 
            ref="title"
            type="text" 
            name="title" 
            :value="taskTitle" 
            autocomplete="off"
        >

        <span class="label">Date</span>
        <input 
            ref="date"
            type="date" 
            name="date" 
            :value="taskDate"
        >

        <span class="label">Description</span>
        <textarea 
            ref="description"
            name="description" 
            cols="10" 
            rows="5" 
            :value="taskDescription"
        ></textarea>

        <span class="label">Color label</span>
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
            taskDescription: this.$store.state.currentTask.description,
            taskActiveColor: this.$store.state.currentTask.color
        }
    },

    methods: {
        handleShowTasks(event) {
            this.$store.dispatch('openTaskList');
        },

        handleInputChange(event) {
            this.taskTitle = this.$refs.title.value;
            this.taskDate = this.$refs.date.value;
            this.taskDescription = this.$refs.description.value;
        },

        handleColorPicked(color) {
            this.taskActiveColor = color;
        },

        handleTaskUpdate(event) {
            event.preventDefault();

            if (this.taskTitle || this.taskTitle.length !== 0) this.task.title = this.taskTitle;
            this.task.date = this.taskDate;
            this.task.description = this.taskDescription;
            this.task.color = this.taskActiveColor;

            this.$store.dispatch('updateTask', this.task);
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@styles/variables.scss";

form > * {
    margin: 0 0 10px;
    width: 100%;
}

textarea {
    resize: vertical;
}

.label {
    color: $color-gray-darker;
    font-size: 0.8em;
    vertical-align: super;
}

.form-action {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;

    > * {
        padding: 8px;
        margin-left: 10px;
    }
    
}
</style>