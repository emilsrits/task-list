import Vue from 'vue';
import Vuex from 'vuex';

import db from './../api/DBService.js';

Vue.use(Vuex);

const state = {
    projects: [],
    tasks: [],
    currentTask: null
};

const mutations = {
    SET_PROJECT_LIST(state, payload) {
        state.projects = payload;
    },

    ADD_PROJECT(state, payload) {
        state.projects.unshift(payload);
    },

    SET_TASK_LIST(state, payload) {
        state.tasks = payload;
    },

    ADD_TASK(state, payload) {
        state.tasks.unshift(payload);
    },

    DELETE_TASK(state, payload) {
        state.tasks.splice(state.tasks.findIndex(i => i.id == payload), 1);
    },

    OPEN_TASK_EDIT(state, payload) {
        state.currentTask = payload;
    },

    OPEN_TASK_LIST(state) {
        state.currentTask = null;
    }
};

const actions = {
    setProjectList(context) {
        db.getAllProjects()
            .then(projects => {
                context.commit('SET_PROJECT_LIST', projects);
            });
    },

    addProject(context, project) {
        db.addProject(project)
            .then(projectId => {
                return db.getProject(projectId);
            })
            .then(project => {
                context.commit('ADD_PROJECT', project);
            });
    },

    setTaskList(context) {
        db.getAllTasks()
            .then(tasks => {
                context.commit('SET_TASK_LIST', tasks);
            });
    },

    addTask(context, task) {
        db.addTask(task)
            .then(taskId => {
                return db.getTask(taskId);
            })
            .then(task => {
                context.commit('ADD_TASK', task);
            });
    },

    updateTask(context, task) {
        db.updateTask(task);
    },

    deleteTask(context, task) {
        db.deleteTask(task)
            .then(() => {
                context.commit('DELETE_TASK', task);
            })
            .catch(error => {
                console.error(error);
            });
    },

    openTaskEdit(context, task) {
        context.commit('OPEN_TASK_EDIT', task);
    },

    openTaskList(context) {
        context.commit('OPEN_TASK_LIST');
    }
};

export default new Vuex.Store({
    state,
    mutations,
    actions
});