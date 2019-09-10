<template>
    <div class="item">
        <div class="item-header">
            <h4>{{ task.title }}</h4>
            
            <div class="task-actions">
                <button class="icon-pencil2 button button-edit"></button>
                <button class="icon-minus button button-delete"></button>
            </div>
        </div>
        <p>{{ task.description }}</p>
    </div>
</template>

<script>
export default {
    name: 'TaskListItem',

    props: ['task']
}
</script>

<style lang="scss" scoped>
@import "../../../sass/variables.scss";

.item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

    .button-edit, .button-delete {
        padding: 4px;
        font-size: 10px;
    }
}
</style>