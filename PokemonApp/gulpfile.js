var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var clean = require('gulp-clean');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var gulpSequence = require('gulp-sequence');
var lint = require('gulp-eslint');
var concat = require('gulp-concat');

var jsFiles = ['*.js', 'src/**/*.js'];
var mainJs = './src/main.js';
var html = './src/*.html';
var css = ['./node_modules/bootstrap/dist/css/bootstrap.min.css', './node_modules/bootstrap/dist/css/bootstrap-theme.min.css', './src/app.css'];
var images = './src/images/*'

var dist = './dist';

gulp.task('connect', function(){
    connect.server({
        root: [dist],
        port: 5000,
        base: 'http://localhost',
        livereload: true
    });
});

gulp.task('open', ['connect'], function() {
    gulp.src(dist + '/index.html')
        .pipe(open({uri: 'http://localhost:5000/'}));
});

gulp.task('html', function(){
    return gulp.src(html)
        .pipe(gulp.dest(dist))
        .pipe(connect.reload());
});

gulp.task('js', function(){
    return browserify(mainJs)
        .transform(reactify)
        .bundle()
        .on('error', function (err){
            console.log(err);
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(dist + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('css', function(){
    return gulp.src(css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(dist + '/css'))
        .pipe(connect.reload());
});

gulp.task('images', function() {
    gulp.src(images)
        .pipe(gulp.dest(dist + '/images'))
        .pipe(connect.reload());

    gulp.src('./src/favicon.ico')
        .pipe(gulp.dest(dist));
});

gulp.task('clean', function () {
    return gulp.src(dist, {read: false})
        .pipe(clean());
});

gulp.task('lint', function(){
    return gulp.src(jsFiles)
        .pipe(lint())
        .pipe(lint.format())
        .pipe(lint.failAfterError());
});

gulp.task('watch', function() {
	gulp.watch(html, ['html']);
	gulp.watch(jsFiles, ['js', 'lint']);
    gulp.watch(css, ['css']);
});

gulp.task('serve', function(done){
    gulpSequence('clean', 'html', 'js', 'css', 'images', 'lint', 'open', 'watch', done);
});