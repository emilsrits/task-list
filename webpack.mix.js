let mix = require('laravel-mix');
let src_path = 'src';

mix.disableNotifications();

mix.webpackConfig({
    resolve: {
        alias: {
            '@api': path.resolve(__dirname, src_path + '/js/api'),
            '@components': path.resolve(__dirname, src_path + '/js/components'),
            '@config': path.resolve(__dirname, src_path + '/js/config'),
            '@styles': path.resolve(__dirname, src_path + '/sass')
        }
    }
});

mix.js('src/js/app.js', 'dist/js/').
    sass('src/sass/app.scss', 'dist/css/app.css');