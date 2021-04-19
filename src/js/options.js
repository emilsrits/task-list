import { saveOptions, restoreOptions } from './options/main';
import { exportTasks, startTaskImport, handleTaskImport } from './options/export-import';

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('.js-save').addEventListener('click', saveOptions);

document.querySelector('.js-export').addEventListener('click', exportTasks);
document.querySelector('.js-import').addEventListener('click', startTaskImport);
document.querySelector('.js-import-file').addEventListener('change', handleTaskImport);