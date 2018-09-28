const gulp = require('gulp');
const connect = require('gulp-connect');
const open = require('open');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');
const svgstore = require('gulp-svgstore');
const inject = require('gulp-inject');
const fg = require('fast-glob');
const path = require('path');
const handlebars = require('gulp-compile-handlebars');
const fs = require('fs');
const split = require('split');

const app = {
    sassRoot: './src/sass/',
    js: './src/js/app.js',
    sass: './src/sass/**/*.scss',
    cssDest: './libs',
    jsDest: './libs',
    icons: './src/icons/*.svg',    
};

const demoApp = {
    sassRoot: ['./src/docs/sass/', './src/sass'],
    sass: './src/docs/sass/**/*.scss',
    js: ['./src/js/app.js', './src/docs/js/kitchensink.js'],
    cssDest: './docs/css',
    jsDest: './docs/js',
    destFolder: './docs/',
    html: './src/docs/*.html',
    components: './src/docs/components/*.handlebars',
    componentspath: './src/docs/components'    
};

function compileSass (app) {
    return () => {
        return gulp.src(app.sass)
            .pipe(sass({
                includePaths: app.sassRoot
            }).on('error', sass.logError))
            .pipe(gulp.dest(app.cssDest));
    };
}

function compileJs (app) {
    return () => {
        return gulp.src(app.js)
        .pipe(webpack({
            entry: app.js,
            output: {
                filename: 'app.js',
                path: path.join(__dirname, 'libs')
            },            
            devtool: 'source-map',
            module: {
                rules: [
                    { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
                    {
                        test: /\.scss$/,
                        use: [
                            { loader: 'css-loader' },
                            {
                                loader: 'sass-loader',
                                options: {
                                    includePaths: ['./src/sass']
                                }
                            }
                        ]
                    },
                    {
                        test: /\.(html)$/,
                        use: {
                            loader: 'html-loader',
                            options: {
                                attrs: [':data-src']
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(gulp.dest(app.jsDest));            
    };
}

function compileHtml(iconList, colorList, componentList) {
    const svgs = gulp.src(app.icons)
    .pipe(svgstore({inlineSvg: true}));

    function fileContents (filePath, file) {
        return file.contents.toString();
    }
    const templateData = {          
        iconList,
        colorList,
        componentList
    },        
    options = {
        helpers : {
            list : function(context, options) {
                let ret = "";
                for (let value of context) {
                    ret += options.fn(value);
                }           
                return ret;
            },
            getColors : function() {
                return colorList;
            }
        },
        batch: [demoApp.componentspath]
    };                
    
    return gulp.src(demoApp.html)
        .pipe(inject(svgs, { transform: fileContents }))
        .pipe(handlebars(templateData, options))
        .pipe(gulp.dest(demoApp.destFolder));
}

function getIconList() {
    const icons = fg.sync(app.icons);    
    return svgIconPath = icons.map(function(icon){
        return { icon: path.basename(icon, '.svg') };
    });
}

function getComponentList() {
    const components = fg.sync(demoApp.components);
    const compnentList = components.map(function(componet){
        return {name: path.basename(componet, '.handlebars')};
    });
    return compnentList;
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

gulp.task('js', compileJs(app));
gulp.task('demo:js', compileJs(demoApp));

gulp.task('html', (done) => {
    let iconlist = getIconList();        
    let componentlist = getComponentList();

    generateColors().then(function(colorList) {
        compileHtml(iconlist, colorList, componentlist);
        done();
    }).catch (function(colorErr) {
        done(colorErr);
    });    
});

gulp.task('start', (done) => {
    connect.server({
        root: process.env.PWD + "/docs/",
        port: 33546
    });
    open("http://localhost:33546");
    done();
});
gulp.task('build', gulp.parallel('sass', 'demo:sass', 'html', 'js', 'demo:js'));
gulp.task('default', gulp.series('build'));