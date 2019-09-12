<template>
    <form @submit="handleTaskUpdate">
        <input type="text" name="title" :value="task.title">
        <textarea name="description" cols="10" :value="task.description"></textarea>

        <div class="form-action">
            <button class="icon-undo2 button button-edit" @click="handleShowTasks"></button>
            <button class="icon-floppy-disk button button-add" type="submit"></button>
        </div>
    </form>
</template>

<script>
export default {
    name: 'TaskEdit',

    data () {
        return {
            task: this.$store.state.currentTask
        }
    },

    methods: {
        handleShowTasks(event) {
            this.$store.dispatch('openTaskList');
        },

        handleTaskUpdate(event) {
            event.preventDefault();

            let el = event.target;

            let title = el.elements.title.value;
            if (title || title.length !== 0) {
                this.task.title = title;
            }

            this.task.description = el.elements.description.value;

            this.$store.dispatch('updateTask', this.task);
        }
    }
}
</script>

<style lang="scss" scoped>
form > * {
    margin: 0 0 10px;
    width: 100%;
}

textarea {
    resize: vertical;
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