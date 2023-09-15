let gulp = require('gulp'),
sass = require('gulp-dart-sass'),
cleanCSS = require('gulp-clean-css');
rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

var paths = {
  styles: {
    src: './scss/**/*.scss',
    dest: './dist/css/'
  }
};

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      errLogToConsole: true,
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false,
    }))
    .pipe(cleanCSS())
    .pipe( rename( { suffix: '.min' } ) )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest));
}

function watch() {
  gulp.watch(paths.styles.src, styles);
}

var build = gulp.series(gulp.parallel(styles));
exports.styles = styles;
exports.watch = watch;
exports.build = build;

/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = build;
