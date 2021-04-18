import { saveOptions, restoreOptions } from './options/main';
import { exportTasks, startTaskImport, handleTaskImport } from './options/export-import';

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);

document.getElementById('export').addEventListener('click', exportTasks);
document.getElementById('import').addEventListener('click', startTaskImport);
document.getElementById('import-file').addEventListener('change', handleTaskImport);