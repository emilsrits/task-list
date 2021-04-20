<template>
    <section>
        <div class="l-fieldset">
            <div class="l-fieldset__header">{{ $t('options.task_actions') }}</div>
            <div class="c-field">
                <label class="c-field__label">
                    <input 
                        id="option-quick-delete" 
                        type="checkbox" 
                        v-model="optQuickDelete"
                    >
                    <span class="c-field__text">{{ $t('options.quick_delete') }}</span>
                </label>
                <p class="c-field__description">{{ $t('options.quick_delete_desc') }}</p>
            </div>
        </div>

        <div class="l-fieldset">
            <div class="l-fieldset__header">{{ $t('options.export_and_import') }}</div>
            <div class="c-field">
                <label class="c-field__label">
                    <input 
                        id="option-import-duplicate" 
                        type="checkbox" 
                        v-model="optImportDuplicate"
                    >
                    <span class="c-field__text">{{ $t('options.import_duplicate') }}</span>
                </label>
                <p class="c-field__description">{{ $t('options.import_duplicate_desc') }}</p>
            </div>
        </div>
    
        <button  
            class="c-button c-button--save js-save"
            @click="handleSave"
        >{{ $t('options.save') }}</button>
    </section>
</template>

<script>
import { CONFIG } from '@config/const';

export default {
    name: 'OptionsMain',

    data() {
        return {
            optQuickDelete: null,
            optImportDuplicate: null
        }
    },

    methods: {
        handleSave() {
            chrome.storage.sync.set(
                {
                    [CONFIG.OPTIONS.NAMES.QUICK_DELETE]: this.optQuickDelete,
                    [CONFIG.OPTIONS.NAMES.IMPORT_DUPLICATE]: this.optImportDuplicate
                },
                this.$emit('savedOptions', this.$t('options.options_saved'))
            );
        },

        restoreOptions() {
            const optionQuickDelete = CONFIG.OPTIONS.NAMES.QUICK_DELETE;
            const optionImportDuplicate = CONFIG.OPTIONS.NAMES.IMPORT_DUPLICATE;

            chrome.storage.sync.get({
                [optionQuickDelete]: CONFIG.OPTIONS.DEFAULTS[optionQuickDelete],
                [optionImportDuplicate]: CONFIG.OPTIONS.DEFAULTS[optionImportDuplicate]
            }, (items) => {
                this.optQuickDelete = items[optionQuickDelete];
                this.optImportDuplicate = items[optionImportDuplicate];
            });
        }
    },

    mounted() {
        this.restoreOptions();
    }
}
</script>