const gulp = require('gulp');
const open = require('open');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');

const app = {
    sassRoot: './src/sass/',
    js: './src/js/app.js',
    sass: './src/sass/**/*.scss',
    dest: './libs'
};
const demoApp = {
    sassRoot: ['./docs/sass/', './src/sass'],
    sass: './docs/sass/**/*.scss',
    dest: './docs/css',
    jsDest: './docs/js'
};

function compileSass (app) {
    return () => {
        return gulp.src(app.sass)
            .pipe(sass({
                includePaths: app.sassRoot
            }).on('error', sass.logError))
            .pipe(gulp.dest(app.dest));
    };
}

gulp.task('sass:watch', function() {
    gulp.watch(app.sass, ['sass']);
});
gulp.task('sass', compileSass(app));
gulp.task('demo:sass', compileSass(demoApp));

gulp.task('js', () => {
    return gulp.src(app.js)
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest(app.dest));
});
gulp.task('demo:js', () => {
    return gulp.src(app.js)
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest(demoApp.jsDest));
});

gulp.task('start', (done) => {
    open('./docs/index.html');
    done();
});
gulp.task('build', gulp.parallel('sass', 'demo:sass', 'js', 'demo:js'));
gulp.task('default', gulp.series('build'));

