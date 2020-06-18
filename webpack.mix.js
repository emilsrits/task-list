let mix = require('laravel-mix');
let src_path = 'assets/js';

mix.disableNotifications();

mix.webpackConfig({
    resolve: {
        alias: {
            '@config': path.resolve(__dirname, src_path + '/config')
        }
    }
});

mix.js('assets/js/app.js', 'dist/js/').
    sass('assets/sass/app.scss', 'dist/css/app.css');