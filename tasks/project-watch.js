var process = require('process'),
    gulp = require('gulp'),
    path = require('path'),
    ts = require('gulp-typescript'),
    watch = require('gulp-watch'),
    babel = require('gulp-babel'),
    nodemon = require('nodemon'),
    reporter = require('./lib/ts.reporter'),
    sourcemaps = require('gulp-sourcemaps'),
    tsProject = ts.createProject(path.join(allianceTaskOptions.path, 'tsconfig.json'), {
        isolatedModules: true
    }),
    es2015Preset = require('babel-preset-es2015');

module.exports = function() {
    var srcPath = [
        path.join(allianceTaskOptions.path, 'app', '**', '*'),
        path.join(allianceTaskOptions.path, 'typings', '**', '*.d.ts'),
        path.join(allianceTaskOptions.path, 'node_modules', 'alliance-bundle', 'typings', 'tsd.d.ts'),
        path.join(allianceTaskOptions.path, 'node_modules', 'alliance-bundle', 'alliance.d.ts')
    ];

    watch(srcPath, function (file) {
        return gulp.src([
            file.path
        ])
            .pipe(sourcemaps.init())
            .pipe(ts(tsProject, {}, reporter()))
            .pipe(babel({
                presets: [es2015Preset]
            }))
            .pipe(sourcemaps.write(path.join('.')))
        	.pipe(gulp.dest(
                path.join(allianceTaskOptions.path, 'built', file.relative.replace(/[^\/]*$/, ''))
            ));
    });

    nodemon('-e "js json css" --watch ' +
            allianceTaskOptions.path + ' ' +
            __dirname + '/../bin/server.js ' +
            allianceTaskOptions.path + ' ' +
            allianceTaskOptions.debug + ' ' +
            allianceTaskOptions.port);
};
