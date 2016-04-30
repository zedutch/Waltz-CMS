var gulp    = require('gulp'),
    stylus  = require('gulp-stylus'),
    nmon    = require('gulp-nodemon'),
    ts      = require('gulp-typescript'),
    mkdirs  = require('mkdirs'),
    exec    = require('child_process').exec,
    config  = require('./app/config/express.conf');

var tsProject = ts.createProject('tsconfig.json');

function run(command) {
    return function (callback) {
        exec(command, function(err, stdout, stderr) {
            console.log(stdout);
            console.error(stderr);
            callback(err);
        });
    };
}

// http://stackoverflow.com/a/29504192
gulp.task('start-mongo', function() {
    var cmd = 'mongod --fork --dbpath ' + config.dbData + '/ --logpath ' + config.logDir + config.dbLog;
    mkdirs(config.dbData);
    mkdirs(config.logDir);
    run(cmd);
});
gulp.task('stop-mongo', run('mongo --eval "db.shutdownServer();"'));

gulp.task('stylus', function () {
    return gulp.src('./app/styles/**/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./app/styles'));
});

gulp.task('compress', function () {
    return gulp.src('./app/styles/**/*.styl')
        .pipe(stylus({
            compress: true
        }))
        .pipe(gulp.dest('./app/styles'));
});

gulp.task('typescript', function() {
    return tsProject.src()
        .pipe(ts(tsProject))
        .js.pipe(gulp.dest('app/dist'));
});

gulp.task('watch', function () {
    gulp.watch('./app/styles/**/*.styl', ['stylus']);
    gulp.watch('./app/scripts/**/*.ts', ['typescript']);
});

gulp.task('dev', ['typescript', 'stylus', 'start-mongo'], function () {
    nmon({
        script : 'server.js',
        ext    : 'js'
    });
});

gulp.task('default', ['dev', 'watch']);