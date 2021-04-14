import * as types from '@store/mutation-types';
import { default as db } from '@api/db';

const state = {
    tasks: [],
    currentTask: null
};

const actions = {
    setTaskList(context) {
        db.getAllTasks()
            .then(tasks => {
                context.commit(types.SET_TASK_LIST, tasks);
            });
    },

    addTask(context, task) {
        db.addTask(task)
            .then(taskId => {
                return db.getTask(taskId);
            })
            .then(task => {
                context.commit(types.ADD_TASK, task);
                context.commit(types.UPDATE_TASK_LIST_ORDER);
            });
    },

    updateTask(context, task) {
        db.updateTask(task);
    },

    deleteTask(context, task) {
        db.deleteTask(task)
            .then(() => {
                context.commit(types.DELETE_TASK, task);
            })
            .catch(error => {
                console.error(error);
            });
    },

    openTaskEdit(context, task) {
        context.commit(types.OPEN_TASK_EDIT, task);
    },

    openTaskList(context) {
        context.commit(types.OPEN_TASK_LIST);
    },

    updateTaskListOrder(context) {
        context.commit(types.UPDATE_TASK_LIST_ORDER);
    }
};

const mutations = {
    [types.SET_TASK_LIST](state, payload) {
        state.tasks = payload;
    },

    [types.ADD_TASK](state, payload) {
        state.tasks.unshift(payload);
    },

    [types.DELETE_TASK](state, payload) {
        state.tasks.splice(
            state.tasks.findIndex(i => i.id == payload), 
            1
        );
    },

    [types.OPEN_TASK_EDIT](state, payload) {
        state.currentTask = payload;
    },

    [types.OPEN_TASK_LIST](state) {
        state.currentTask = null;
    },

    [types.UPDATE_TASK_LIST_ORDER](state) {
        state.tasks.map((task, index) => {
            task.order = index + 1;
            db.updateTask(task);
        });
    }
};

export default {
    state,
    actions,
    mutations
};