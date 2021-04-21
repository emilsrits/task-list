let mix = require('laravel-mix');
let src_path = 'src';

mix.disableNotifications();

mix.options({
    terser: {
        extractComments: false,
    }
});

mix.webpackConfig({
    resolve: {
        alias: {
            '@api': path.resolve(__dirname, src_path + '/js/api'),
            '@components': path.resolve(__dirname, src_path + '/js/components'),
            '@config': path.resolve(__dirname, src_path + '/js/config'),
            '@lang': path.resolve(__dirname, src_path + '/js/lang'),
            '@store': path.resolve(__dirname, src_path + '/js/store'),
            '@utils': path.resolve(__dirname, src_path + '/js/utils'),
            '@styles': path.resolve(__dirname, src_path + '/sass')
        }
    }
});

mix.js('src/js/app.js', 'src/assets/js/app.js')
    .js('src/js/options.js', 'src/assets/js/options.js')
    .sass('src/sass/app.scss', 'src/assets/css/app.css')
    .sass('src/sass/options.scss', 'src/assets/css/options.css');