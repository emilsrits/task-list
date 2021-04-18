import { CONFIG } from '@config/const';
import { default as message } from './message';

const ID_QUICK_DELETE = 'quick-delete';
const ID_IMPORT_DUPLICATE = 'import-duplicate';
const ID_STATUS = 'status';

export const saveOptions = () => {
    const valueQuickDelete = document.getElementById(ID_QUICK_DELETE).checked;
    const valueImportDuplicate = document.getElementById(ID_IMPORT_DUPLICATE).checked;

    chrome.storage.sync.set(
        {
            [CONFIG.OPTIONS.NAMES.QUICK_DELETE]: valueQuickDelete,
            [CONFIG.OPTIONS.NAMES.IMPORT_DUPLICATE]: valueImportDuplicate
        },
        message(ID_STATUS, 'Options saved')
    );
};

export const restoreOptions = () => {
    const optionQuickDelete = CONFIG.OPTIONS.NAMES.QUICK_DELETE;
    const optionImportDuplicate = CONFIG.OPTIONS.NAMES.IMPORT_DUPLICATE;

    chrome.storage.sync.get({
        [optionQuickDelete]: CONFIG.OPTIONS.DEFAULTS[optionQuickDelete],
        [optionImportDuplicate]: CONFIG.OPTIONS.DEFAULTS[optionImportDuplicate]
    }, (items) => {
        document.getElementById(ID_QUICK_DELETE).checked = items[optionQuickDelete];
        document.getElementById(ID_IMPORT_DUPLICATE).checked = items[optionImportDuplicate];
    });
};
