var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

var buildVars = require('./package.json').build;

gulp.task('front-end', function () {
  browserify({
    entries: buildVars.jsx.main,
    extensions: ['.jsx', '.js'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source(buildVars.jsx.final))
  .pipe(gulp.dest(buildVars['build-dir']));
})
.task('sass', function () {
        gulp.src(['./node-modules/normalize.css/normalize.css', buildVars.sass.main])
            .pipe(sass({
                includePaths: require('node-neat').includePaths
                }))
            .pipe(concat(buildVars.sass.final))
            //.pipe(isProduction ? cssmin() : util.noop())
            //.pipe(header('/* Arquivo gerado, não modificar diretamente */\r\n'))
            .pipe(gulp.dest(buildVars['build-dir']  ));
})
.task('html', function() {
    gulp.src(buildVars.html)
            .pipe(gulp.dest(buildVars['build-dir']));

})
.task('build', ['sass', 'front-end', 'html'], function () {
      // place code for your default task here

}).task('watch', ['default'], function () {
    gulp.watch(buildVars.html, ['html']);
    gulp.watch(buildVars.jsx.files, ['front-end']);
    gulp.watch(buildVars.sass.files, ['sass']);
});


 
gulp.task('default', ['build']);