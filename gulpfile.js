var gulp    = require('gulp'),
    stylus  = require('gulp-stylus'),
    nmon    = require('gulp-nodemon'),
    ts      = require('gulp-typescript'),
    tsMaps  = require('gulp-sourcemaps'),
    mkdirs  = require('mkdirs'),
    exec    = require('child_process').exec,
    config  = require('./app/config/express.conf'),
    del     = require('del');

var KarmaServer = require('karma').Server;

var tsProject = ts.createProject('tsconfig.json');

function run(command) {
    return function (callback) {
        console.log("Running", command);
        exec(command, function(err, stdout, stderr) {
            console.log(stdout);
            console.error(stderr);
            if (callback) {
                callback(err);
            }
        });
    };
}

gulp.task('clean', function () {
	return del(['app/dist/**/*']);
});

// http://stackoverflow.com/a/29504192
gulp.task('start-mongo', function() {
    var cmd = 'mongod --dbpath ' + config.dbData + '/ --logpath ' + config.logDir + config.dbLog;
    mkdirs(config.dbData);
    mkdirs(config.logDir);
    run(cmd)();
});

gulp.task('stop-mongo', run('mongo --eval "db.shutdownServer();"'));

gulp.task('stylus', ['clean'], function () {
    return gulp.src('app/styles/**/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('app/dist/styles'));
});

gulp.task('compress', function () {
    return gulp.src('./app/styles/**/*.styl')
        .pipe(stylus({
            compress: true
        }))
        .pipe(gulp.dest('./app/dist/styles'));
});

gulp.task('typescript', ['clean'], function() {
    return tsProject.src()
        .pipe(tsMaps.init())
        .pipe(ts(tsProject)).js
        .pipe(tsMaps.write('.'))
        .pipe(gulp.dest('app/dist'));
});

gulp.task('test', ['clean', 'typescript', 'stylus'], function() {
    new KarmaServer({
        configFile : __dirname + '/karma.conf.js',
        singleRun: true
    }).start();
});

gulp.task('watch', function () {
    gulp.watch('./app/styles/**/*.styl', ['stylus']);
    gulp.watch('./app/scripts/**/*.ts', ['typescript']);
});

gulp.task('dev', ['clean', 'typescript', 'stylus', 'start-mongo'], function () {
    nmon({
        script : 'server.js',
        ext    : 'js'
    });
});

gulp.task('default', ['dev', 'watch']);