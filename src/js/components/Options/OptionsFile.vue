<template>
    <section>
        <button 
            class="c-button c-button--big" 
            @click="handleTasksExport"
        >{{ $t('options.export_tasks') }}</button>
        <button 
            class="c-button c-button--big" 
            @click="startTasksImport"
        >{{ $t('options.import_tasks') }}</button>

        <div class="h-hidden">
            <input 
                ref="inputFile" 
                type="file" 
                accept="application/json"
                @change="handleTasksImport"
            >
        </div>
    </section>
</template>

<script>
import { default as db } from '@api/db';

export default {
    name: 'OptionsFile',

    methods: {
        handleTasksExport() {
            db.getAllTasks().then(
                result => {
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
                }
            );
        },

        handleTasksImport(event) {
            const file = event.currentTarget.files[0];

            if (file === undefined || file.name === '') return;
            if (file.type.indexOf('application/json') !== 0) return;

            const fileReaderOnLoadHandler = (progressEvent) => {
                let tasks;

                try {
                    tasks = JSON.parse(progressEvent.currentTarget.result);

                    if (typeof tasks !== 'object') {
                        throw this.$t('options.invalid_content_type');
                    } if (typeof tasks[0] !== 'object') {
                        throw this.$t('options.invalid_content');
                    } if (!tasks[0].hasOwnProperty('title')) {
                        throw THROW_INVALID_CONTENT;
                    }

                    db.addTasks(tasks)
                        .then(() => this.$emit('importedFile', this.$t('options.import_success')))
                        .catch(() => window.alert(this.$t('options.import_failed')));
                } catch (e) {
                    window.alert(e);
                }
            }

            const reader = new FileReader();
            reader.onload = fileReaderOnLoadHandler;
            reader.readAsText(file);
        },

        startTasksImport() {
            const input = this.$refs.inputFile;

            input.value = '';
            input.click();
        }
    }
}
</script>