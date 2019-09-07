const DB_NAME = 'todoDB';
const DB_VERSION = 1;
const DB_STORE_NAME = 'todos';

let db;

const getObjectStore = (storeName, mode) => {
    let tx = db.transaction(storeName, mode);

    return tx.objectStore(storeName);
};

const openDb = () => {
    return new Promise((resolve, reject) => {
        let req = indexedDB.open(DB_NAME, DB_VERSION);

        req.onsuccess = event => {
            db = event.target.result;
            resolve();
        };

        req.onerror = event => {
            reject('openDb:', event.target.errorCode);
        };

        req.onupgradeneeded = event => {
            db = event.target.result;

            if (!db.objectStoreNames.contains(DB_STORE_NAME)) {
                let store = event.currentTarget.result.createObjectStore(
                    DB_STORE_NAME,
                    { keyPath: 'id', autoIncrement: true }
                );

                store.createIndex('title', 'title');
                store.createIndex('description', 'description');
                store.createIndex('done', 'done');
            }
        }
    });
};

const getAllTodo = () => {
    openDb()
        .then(response => {
            let store = getObjectStore(DB_STORE_NAME, 'readonly');

            store.getAll().onsuccess = event => {
                return event.target.result;
            };
        })
        .catch(error => {
            console.error(error.message);
        });
};

const addTodo = (title, description = null, done = false) => {
    let todo = {
        title: title,
        description: description,
        done: done
    };

    let store;
    let req;

    openDb()
        .then(response => {
            store = getObjectStore(DB_STORE_NAME, 'readwrite');

            try {
                req = store.add(todo);
            } catch (e) {
                if (e.name == 'DataCloneError') {
                    displayActionFailure("This engine doesn't know how to clone a Blob, use Firefox");
                    throw e;
                }
            }
        
            req.onsuccess = event => {
                return event.target.result;
            };
        
            req.onerror = () => {
                console.log('Insertion error', this.error);
            };
        })
        .catch(error => {
            console.error(error.message);
        });
};

export default {
    openDb,
    getAllTodo,
    addTodo
}