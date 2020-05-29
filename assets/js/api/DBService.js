import { openDB } from 'idb';

const DB_NAME = 'taskDB';
const DB_VERSION = 1;
const DB_STORE_TASKS = 'tasks';

async function getDb() {
    const db = await openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(DB_STORE_TASKS)) {
                const store = db.createObjectStore(DB_STORE_TASKS, {
                    keyPath: 'id',
                    autoIncrement: true,
                });
    
                store.createIndex('title', 'title');
            }
        }
    });
    
    return db;
};

const getAllTasks = async () => {
    const db = await getDb();
    let tasks = await db.getAll(DB_STORE_TASKS);
    
    tasks.sort((a, b) => {
        return a.order - b.order;
    });
    
    return tasks;
};

const getTask = async (id) => {
    const db = await getDb();
    let task = await db.get(DB_STORE_TASKS, id);

    return task;
};

const addTask = async ({ title, done = false }) => {
    const db = await getDb();
    let task = await db.add(DB_STORE_TASKS, {
        title,
        done
    });
    
    return task;
};

const updateTask = async ({id, title, description, date, done, order }) => {
    const db = await getDb();
    let task = await db.put(DB_STORE_TASKS, {
        id,
        title,
        description,
        date,
        done,
        order
    })

    return task;
};

const deleteTask = async (id) => {
    const db = await getDb();
    let task = await db.delete(DB_STORE_TASKS, Number(id));

    return task;
};

export default {
    getAllTasks,
    getTask,
    addTask,
    updateTask,
    deleteTask
}