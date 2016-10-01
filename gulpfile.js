var gulp   = require('gulp'),
    nmon   = require('gulp-nodemon'),
    tap    = require('gulp-tap'),
    pug    = require('gulp-pug'),
    stylus = require('gulp-stylus'),
    concat = require('gulp-concat'),
    mkdirs = require('mkdirs'),
    exec   = require('child_process').exec,
    spawn  = require('child_process').spawn,
    config = require('./src/config/express.conf');

function run(command) {
    return function (callback) {
        console.log("Running", command);
        exec(command, {maxBuffer: 1024 * 500}, function(err, stdout, stderr) {
            console.log(stdout);
            console.error(stderr);
            if (callback) {
                callback(err);
            }
        });
    };
}

// http://stackoverflow.com/a/29504192
gulp.task('start-mongo', () => {
    var cmd = 'mongod --dbpath ' + config.dbData + '/ --logpath ' + config.logDir + config.dbLog;
    mkdirs(config.dbData);
    mkdirs(config.logDir);
    run(cmd)();
});

gulp.task('stop-mongo', run('mongo --eval "db.shutdownServer();"'));

gulp.task('populate', () => {
    return gulp.src(config.dbInitialFiles)
               .pipe(tap(function(file) {
                    var args = ['--drop', '--jsonArray', '--db=' + config.dbName, file.path];
                    var mongoimport = spawn('mongoimport', args)
                    mongoimport.stdout.on('data', function(data) {
                        console.log(`stdout: ${data}`);
                    });

                    mongoimport.stderr.on('data', function(data) {
                        console.error(`stderr: ${data}`);
                    });

                    mongoimport.on('close', (code) => {
                      console.log(`mongoimport process exited with code ${code}`);
                    });
               }));
});

var pugSourceFiles    = './src/app/views/**/*.pug';
var stylusSourceFiles = './src/app/styles/**/*.styl';

gulp.task('pug', () => {
    gulp.src(pugSourceFiles)
        .pipe(pug().on('error', (e) => console.log('PUG ERROR:', e)))
        .pipe(gulp.dest('./src/app/views-dist'));
});

gulp.task('stylus', () => {
    gulp.src(stylusSourceFiles)
        .pipe(stylus())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./src'));
});

gulp.task('watch', () => {
    gulp.watch(pugSourceFiles,    ['pug']);
    gulp.watch(stylusSourceFiles, ['stylus']);
});

gulp.task('dev', ['start-mongo', 'watch', 'pug', 'stylus'], () => {
    nmon({
        script : 'src/server/app.js',
        ext    : 'js'
    });
});

gulp.task('default', ['dev']);