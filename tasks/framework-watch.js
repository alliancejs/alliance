var process = require('process'),
    path = require('path'),
    gulp = require('gulp'),
    babel = require('gulp-babel'),
    watch = require('gulp-watch'),
    ts = require('gulp-typescript'),
    reporter = require('./lib/ts.reporter'),
    sourcemaps = require('gulp-sourcemaps'),
    tsProject = ts.createProject(path.join(__dirname, '..', 'tsconfig.json'));

module.exports = function() {
    var srcPath = path.join(__dirname, '..', 'src', '**', '*.ts');

    watch(srcPath, function () {
        gulp.src(srcPath)
            .pipe(sourcemaps.init())
            .pipe(ts(tsProject, {}, reporter()))
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(sourcemaps.write(path.join('.')))
            .pipe(gulp.dest(path.join(__dirname, '..')));
    });
};
