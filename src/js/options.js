import { CONFIG } from '@config/const';

const ID_QUICK_DELETE = 'quick-delete';
const ID_STATUS = 'status';

function saveOptions() {
    const valueQuickDelete = document.getElementById(ID_QUICK_DELETE).checked;

    chrome.storage.sync.set(
        {
            [CONFIG.OPTIONS.NAMES.QUICK_DELETE]: valueQuickDelete,
        },
        setStatusMessage('Options saved')
    );
}

function restoreOptions() {
    const optionQuickDelete = CONFIG.OPTIONS.NAMES.QUICK_DELETE;

    chrome.storage.sync.get({
        [optionQuickDelete]: CONFIG.OPTIONS.DEFAULTS[optionQuickDelete],
    }, (items) => {
        document.getElementById(ID_QUICK_DELETE).checked = items[optionQuickDelete];
    });
}

const setStatusMessage = (message) => {
    const CLASS_VISIBLE = 'is-visible';

    const status = document.getElementById(ID_STATUS);

    status.classList.add(CLASS_VISIBLE);
    status.textContent = message;

    setTimeout(() => {
        status.textContent = '';
        status.classList.remove(CLASS_VISIBLE);
    }, 1000);
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
