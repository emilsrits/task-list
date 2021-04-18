import { CONFIG } from '@config/const';
import { default as message } from './message';

const ID_QUICK_DELETE = 'quick-delete';
const ID_STATUS = 'status';

export const saveOptions = () => {
    const valueQuickDelete = document.getElementById(ID_QUICK_DELETE).checked;

    chrome.storage.sync.set(
        {
            [CONFIG.OPTIONS.NAMES.QUICK_DELETE]: valueQuickDelete,
        },
        message(ID_STATUS, 'Options saved')
    );
};

export const restoreOptions = () => {
    const optionQuickDelete = CONFIG.OPTIONS.NAMES.QUICK_DELETE;

    chrome.storage.sync.get({
        [optionQuickDelete]: CONFIG.OPTIONS.DEFAULTS[optionQuickDelete],
    }, (items) => {
        document.getElementById(ID_QUICK_DELETE).checked = items[optionQuickDelete];
    });
};
