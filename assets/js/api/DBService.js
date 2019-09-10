import Dexie from 'dexie';
import Relationships from 'dexie-relationships';

const DB_NAME = 'taskDB';
const DB_VERSION = 1;

let db = new Dexie(DB_NAME, {
    addons: [Relationships]
});

db.version(DB_VERSION).stores({
    projects: '++id, title',
    tasks: '++id, title, projectId -> projects.id, description, date, done'
});

const getAllProjects = async () => {
    let projects = await db.projects.with({ tasks: 'tasks' });
    return projects;
};

const getProject = async (id) => {
    let project = await db.projects.where('id').equals(id).first();

    return project;
};

const addProject = async ({ title }) => {
    let project = await db.projects.add({
        title: title
    });

    return project;
};

const getAllTasks = async () => {
    let tasks = await db.tasks.orderBy('id').reverse().toArray();
    return tasks;
};

const getTask = async (id) => {
    let task = await db.tasks.where('id').equals(id).first();

    return task;
};

const addTask = async ({ title, projectId = null, done = false }) => {
    let task = await db.tasks.add({
        title: title,
        projectId: projectId,
        done: done
    });
    
    return task;
};

const updateTask = async (id, { title, description, date, done }) => {
    let task = await db.tasks.update(id, {
        title: title,
        description: description,
        date: date,
        done: done
    })

    return task;
};

export default {
    getAllProjects,
    getProject,
    addProject,
    getAllTasks,
    getTask,
    addTask,
    updateTask
}