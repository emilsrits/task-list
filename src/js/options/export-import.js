import { default as db } from '@api/db';
import { default as message } from './message';

const ID_IMPORT_FILE = 'import-file';
const ID_STATUS_FILE = 'status-file';

const THROW_INVALID_CONTENT_TYPE = 'Invalid file content type.';
const THROW_INVALID_CONTENT = 'Invalid file content.';
const THROW_IMPORT_FAILED = 'Import failed.';

export const exportTasks = () => {
    db.getAllTasks()
        .then(result => {
            const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'text/json' });
            const link = document.createElement('a');

            link.download = 'task-list.json';
            link.href = window.URL.createObjectURL(blob);
            link.dataset.downloadurl = [
                'text/json',
                link.download,
                link.href
            ].join(':');

            const mouseEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });

            link.dispatchEvent(mouseEvent);
            link.remove();
        });
};

export const startTaskImport = () => {
    const input = document.getElementById(ID_IMPORT_FILE);

    input.value = '';
    input.click();
};

export const handleTaskImport = (event) => {
    const file = event.currentTarget.files[0];

    if (file === undefined || file.name === '') return;
    if (file.type.indexOf('application/json') !== 0) return;

    const fileReaderOnLoadHandler = (progressEvent) => {
        let tasks;

        try {
            tasks = JSON.parse(progressEvent.currentTarget.result);

            if (typeof tasks !== 'object') {
                throw THROW_INVALID_CONTENT_TYPE;
            } if (typeof tasks[0] !== 'object') {
                throw THROW_INVALID_CONTENT;
            } if (!tasks[0].hasOwnProperty('title')) {
                throw THROW_INVALID_CONTENT;
            }

            db.addTasks(tasks)
                .then(() => message(ID_STATUS_FILE, 'Imported successfully'))
                .catch(() => window.alert(THROW_IMPORT_FAILED));
        } catch (e) {
            window.alert(e);
        }
    }

    const reader = new FileReader();
    reader.onload = fileReaderOnLoadHandler;
    reader.readAsText(file);
};