const gulp = require('gulp');
const connect = require('gulp-connect');
const open = require('open');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');
const svgstore = require('gulp-svgstore');
const inject = require('gulp-inject');
const glob = require('glob');
const path = require('path');
const handlebars = require('gulp-compile-handlebars');
const fs = require('fs');
const split = require('split');
const concat = require('gulp-concat');

const app = {
    sassRoot: './src/sass/',
    js: './src/js/app.js',
    sass: './src/sass/**/*.scss',
    dest: './libs',
    icons: './src/icons/*.svg',
    html: './src/*.html'
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

function compileHtml(iconSprite, colorList) {
    const svgs = gulp.src(app.icons)
    .pipe(svgstore({inlineSvg: true}));

    function fileContents (filePath, file) {
        return file.contents.toString();
    }

    const templateData = {          
        iconSprite,
        colorList
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
        }
    }                
    return gulp.src(app.html)
        .pipe(inject(svgs, { transform: fileContents }))
        .pipe(handlebars(templateData, options))
        .pipe(gulp.dest(demoApp.destFolder));
}

async function generateColors() {    
    const charStream = fs.createReadStream('./src/sass/themes/cms/_edlio.scss');
    const lineStream = charStream.pipe(split());
    let colors = [];

    await lineStream.on('data', function(line) {
        const regVarName = new RegExp('\\$(.+?)(?=\\s*:)');
        const regHexValue = new RegExp('(#[0-9a-fA-F]{3,6})');
        let name = line.match(regVarName);
        let color = line.match(regHexValue);
        
        if (name !== null && color !== null) {
            colors.push({"name": name[0] , "hex": color[0]});
        }    
    });
    return colors;   
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
    glob(app.icons, function (globErr, icons) {
        if(globErr){
            done(globErr);
            return;
        }
        const svgIconPath = icons.map(function(icon){
            return { icon: path.basename(icon, '.svg') };
        });

        generateColors().then(function(colors) {
            compileHtml(svgIconPath, colors);   
            done();
        }).catch (function(colorErr) {
            done(colorErr);
        });        
    });    
});

gulp.task('concat:uploader:js', function () {
    return gulp.src(['./src/js/libraries/Dropbox.js', './src/js/libraries/google-api.js', './src/js/libraries/uploader/*.js'])
      .pipe(concat('uploader.js'))
      .pipe(gulp.dest('./src/js/components'));
});

gulp.task('start', (done) => {
    connect.server({
        root: process.env.PWD + "/docs/",
        port: 33546
    });
    open("http://localhost:33546");
    done();
});
gulp.task('build', gulp.series('concat:uploader:js', gulp.parallel('sass', 'demo:sass', 'html', 'js', 'demo:js')));
gulp.task('default', gulp.series('build'));

