var gulp = require('gulp');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var exec = require('child_process').exec;

var jsFiles = ['*.js', 'src/**/*.js'];

function runCommand(command) {
  return function (done) {
    exec(command, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      done(err);
    });
  }
}

gulp.task('style', function(){
    gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }));
});

gulp.task('dynamodb', function(){

});

gulp.task('serve', ['style'], function(){
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 3001
        },
        watch: jsFiles,
        ignore: [
            "db/**",
            "node_modules/**/node_modules"
        ],
    };

    return nodemon(options)
        .on('restart', function(){
            console.log('Restarting...');
        });
});