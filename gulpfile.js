// import autoprefixer from 'gulp-autoprefixer';
const gulp = require('gulp');
const {src, dest, series, parallel, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const { watch } = require('gulp');

exports.default = function() {
    // All events will be watched
    watch('src/*.js', { events: 'all' }, function(cb) {
      // body omitted
      cb();
    });
  };
  
const paths = {
    sass: './src/components/**/*.scss',
    sassDest: './src/components/',
    img: './src/assets/**/*',
    imgDest: './public/assets',
    dist: './src/components/**',
}
const mainFunctions = parallel(sassCompiler, convertImages)

function sassCompiler(done) {
    src(paths.sass)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(dest(paths.sassDest))
    done()
}

function convertImages(done){
    src(paths.img)
        .pipe(imagemin())
        .pipe(dest(paths.imgDest))
    done()
}

function watchForChanges(done){
    watch([paths.sass], parallel(sassCompiler));
    watch(paths.img, convertImages);
    done()
}

exports.default = series(mainFunctions, watchForChanges)
exports.compile = sassCompiler
exports.watch = watchForChanges
exports.images = convertImages
