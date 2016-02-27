var process = require('process'),
    path = require('path'),
    gulp = require('gulp'),
    babel = require('gulp-babel'),
    watch = require('gulp-watch'),
    dts = require('dts-bundle'),
    ts = require('gulp-typescript'),
    reporter = require('./lib/ts.reporter'),
    sourcemaps = require('gulp-sourcemaps'),
    merge = require('merge2'),
    tsProject = ts.createProject(path.join(__dirname, '..', 'tsconfig.json'));

module.exports = function() {
    var srcPath = [
        path.join(__dirname, '..', 'src', '**', '*.ts'),
        path.join(__dirname, '..', 'bundle', 'typings', '**', '*.ts'),
        path.join(__dirname, '..', 'bundle', 'alliance.d.ts')
    ];

    watch(srcPath, function () {
        var result = gulp.src(srcPath)
            .pipe(sourcemaps.init())
            .pipe(ts(tsProject, {
                typescript: require('typescript')
            }, reporter()));

        return merge([
            result.dts
                .pipe(gulp.dest(path.join(__dirname, '..', 'bundle', 'definitions', 'sources')))
                .on('end', function() {
                    require('./definitions')();
                }),

            result.js
                .pipe(babel({
                    presets: ['es2015']
                }))
                .pipe(sourcemaps.write(path.join('.')))
                .pipe(gulp.dest(path.join(__dirname, '..', 'bundle', 'built')))
        ])
    });
};
