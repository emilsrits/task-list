let mix = require('laravel-mix');

mix.js('assets/js/app.js', 'dist/js/').
    sass('assets/sass/app.scss', 'dist/css/app.css');