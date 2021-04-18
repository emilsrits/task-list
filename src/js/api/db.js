import { openDB } from 'idb';

const DB_NAME = 'taskDB';
const DB_VERSION = 1;
const DB_STORE_TASKS = 'tasks';
const DB_TASKS_INDEX_TITLE = 'title';

async function getDb() {
    const db = await openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(DB_STORE_TASKS)) {
                const store = db.createObjectStore(DB_STORE_TASKS, {
                    keyPath: 'id',
                    autoIncrement: true
                });
    
                store.createIndex(DB_TASKS_INDEX_TITLE, DB_TASKS_INDEX_TITLE);
            }
        }
    });
    
    return db;
};

const getAllTasks = async () => {
    const db = await getDb();
    const tasks = await db.getAll(DB_STORE_TASKS);
    
    tasks.sort((a, b) => {
        return a.order - b.order;
    });
    
    return tasks;
};

const getTask = async (id) => {
    const db = await getDb();
    const task = await db.get(DB_STORE_TASKS, id);

    return task;
};

const addTask = async ({ title, done = false }) => {
    const db = await getDb();
    const task = await db.add(DB_STORE_TASKS, {
        title,
        done
    });
    
    return task;
};

const addTasks = async (tasks) => {
    const db = await getDb();
    const tx = db.transaction(DB_STORE_TASKS, 'readwrite');

    const promises = [];
 
    for (const task of tasks) {
        const { id, ...data } = task;
        promises.push(tx.store.put(data));
    }

    promises.push(tx.done);

    return Promise.all(promises);
};

const updateTask = async ({ id, title, description, date, time, done, color, order }) => {
    const db = await getDb();
    const task = await db.put(DB_STORE_TASKS, {
        id,
        title,
        description,
        date,
        time,
        done,
        color,
        order
    })

    return task;
};

const deleteTask = async (id) => {
    const db = await getDb();
    const task = await db.delete(DB_STORE_TASKS, Number(id));

    return task;
};

export default {
    getAllTasks,
    getTask,
    addTask,
    addTasks,
    updateTask,
    deleteTask
}