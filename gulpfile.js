const gulp = require('gulp');
const open = require('open');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');
const svgstore = require('gulp-svgstore');
const inject = require('gulp-inject');
const glob = require('glob');
const path = require('path');
const handlebars = require('gulp-compile-handlebars');
const concat = require('gulp-concat');

const app = {
    sassRoot: './src/sass/',
    js: './src/js/app.js',
    sass: './src/sass/**/*.scss',
    dest: './libs',
    icons: './src/icons/*.svg',
    html: './src/*.html',
    components: './src/components'
};

const demoApp = {
    sassRoot: ['./docs/sass/', './src/sass'],
    sass: './docs/sass/**/*.scss',
    dest: './docs/css',
    jsDest: './docs/js',
    destFolder: './docs/'
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

function compileHtml(iconSprite) {
    const svgs = gulp.src(app.icons)
    .pipe(svgstore({inlineSvg: true}));

    function fileContents (filePath, file) {
        return file.contents.toString();
    }

    const templateData = {          
        iconSprite
    },        
    options = {
        helpers : {
            list : function(context, options) {
                let ret = "";
                for (let value of context) {
                    ret += options.fn(value);
                }                
                return ret;
            }
        },
        batch: [app.components]
    }                

    return gulp.src(app.html)
        .pipe(inject(svgs, { transform: fileContents }))
        .pipe(handlebars(templateData, options))
        .pipe(gulp.dest(demoApp.destFolder));
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

gulp.task('html', (done) => {
    glob(app.icons, function (err, icons) {
        const svgIconPath = icons.map(function(icon){
            return { icon: path.basename(icon, '.svg') };
        }); 
        
        compileHtml(svgIconPath, app.components);
        done(err);
    });
});

gulp.task('start', (done) => {
    open('./docs/index.html');
    done();
});
gulp.task('build', gulp.parallel('sass', 'demo:sass', 'html', 'js', 'demo:js'));
gulp.task('default', gulp.series('build'));

