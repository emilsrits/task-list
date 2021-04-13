import { CONFIG } from '@config/const';

export const getOption = async (optionName) => {
    return new Promise(resolve => {
        chrome.storage.sync.get({
            [optionName]: CONFIG.OPTIONS.DEFAULTS[optionName]
        }, (options) => {
            resolve(options[optionName]);
        });
    });
};