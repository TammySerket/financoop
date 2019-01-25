// npm i gulp gulp-sass gulp-babel gulp-pug browser-sync gulp-concat gulp-uglify gulp-clean-css pump --save-dev @babel/core @babel/preset-env gulp-rename gulp-autoprefixer

var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
// var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');

gulp.task('prefixer', () =>
  gulp.src('build/css/styles.css')
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('dist/css'))
);

var paths = {
  scripts: {
    src: 'src/js/*.js',
    dest: 'build/js/',
    destDist: 'dist/js/'
  }
};

function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    // .pipe(concat('funciones.min.js'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(gulp.dest(paths.scripts.destDist));
}
function watch() {
  gulp.watch(paths.scripts.src, scripts);
}
exports.scripts = scripts;
exports.watch = watch;
var build = gulp.parallel(scripts, 'prefixer');
gulp.task('build', build)
// gulp build = minimiza y aplica Babel a los .js y le agrega los prefijos al css en 'Dist'

gulp.task('pug', () => 
  gulp.src('./src/views/pages/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./build/'))
  .pipe(gulp.dest('./dist/'))
  .pipe(browserSync.stream())
);

gulp.task('sass', function () {
  return gulp.src('./src/scss/styles.scss')
    .pipe(sass({
      includePaths: ['src/scss'],
      errLogToConsole: true,
      outputStyle: 'compressed',
      onError: browserSync.notify
    }))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});
gulp.task('watchSass', function() {
  gulp.watch('src/scss/styles.scss', gulp.series('sass'));
});
gulp.task('watchPug', function() {
  gulp.watch('src/views/pages/*.pug', gulp.series('pug'));
});
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './build/'
    }
  }),
  gulp.watch('build/*.html', browserSync.reload);
});
gulp.task('watchAll', gulp.parallel('watchSass', 'watchPug', 'browserSync'))
gulp.task('default', gulp.parallel('watchAll'));