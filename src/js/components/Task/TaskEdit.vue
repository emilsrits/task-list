<template>
    <form @submit="handleTaskUpdate">
        <span class="label">Title</span>
        <input 
            type="text" 
            name="title" 
            :value="task.title" 
            autocomplete="off"
        >

        <span class="label">Date</span>
        <input 
            type="date" 
            name="date" 
            :value="task.date"
        >

        <span class="label">Description</span>
        <textarea 
            name="description" 
            cols="10" 
            rows="5" 
            :value="task.description"
        ></textarea>

        <span class="label">Color label</span>
        <color-picker :active-color="this.activeColor" @colorPicked="handleColorPicked"/>

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
            activeColor: this.$store.state.currentTask.color
        }
    },

    methods: {
        handleShowTasks(event) {
            this.$store.dispatch('openTaskList');
        },

        handleColorPicked(color) {
            this.activeColor = color;
        },

        handleTaskUpdate(event) {
            event.preventDefault();

            let el = event.target;

            let title = el.elements.title.value;
            if (title || title.length !== 0) {
                this.task.title = title;
            }

            this.task.date = el.elements.date.value;

            this.task.description = el.elements.description.value;

            this.task.color = this.activeColor;

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