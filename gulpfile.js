var gulp    = require('gulp'),
    stylus  = require('gulp-stylus'),
    nmon    = require('gulp-nodemon'),
    ts      = require('gulp-typescript'),
    tsMaps  = require('gulp-sourcemaps'),
    mkdirs  = require('mkdirs'),
    exec    = require('child_process').exec,
    config  = require('./app/config/express.conf'),
    del     = require('del');

var KarmaServer   = require('karma').Server,
    remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');

var tsProject   = ts.createProject('tsconfig.json');
var testProject = ts.createProject('tsTestConfig.json');

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

gulp.task('tests-typescript', ['clean'], function() {
    return testProject.src()
               .pipe(tsMaps.init())
               .pipe(ts(testProject)).js
               .pipe(tsMaps.write('.'))
               .pipe(gulp.dest('test/'));
});

gulp.task('typescript', ['clean'], function() {
    return tsProject.src()
               .pipe(tsMaps.init())
               .pipe(ts(tsProject)).js
               .pipe(tsMaps.write('.'))
               .pipe(gulp.dest('app/dist'));
});

gulp.task('unit-test', ['clean', 'typescript', 'stylus', 'tests-typescript'], function(done) {
    new KarmaServer({
        configFile : __dirname + '/karma.conf.js',
        singleRun: true
    }, testsDone).start();

    function testsDone (exitCode) {
        console.log('Unit tests done. Exit code: ' + exitCode);
        remapCoverage();
        done();
    }
});

function remapCoverage () {
    gulp.src(config.report.path + 'report-json/coverage-final.json')
        .pipe(remapIstanbul({
            reports : {
                'lcovonly'     : config.report.path + 'remap/lcov.info',
                'json'         : config.report.path + 'remap/coverage.json',
                'html'         : config.report.path + 'remap/html-report',
                'text-summary' : config.report.path + 'remap/text-summary.txt'
            }
        }))
        .on('finish', function () {
            console.log('Remapping done. View the result in ' + config.report.path + 'remap/html-report');
        })
}

gulp.task('test', ['clean', 'unit-test']);

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