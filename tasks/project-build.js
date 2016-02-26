var process = require('process'),
    gulp = require('gulp'),
    path = require('path'),
    ts = require('gulp-typescript'),
    babel = require('gulp-babel'),
    sourcemaps = require('gulp-sourcemaps'),
    reporter = require('./lib/ts.reporter'),
    tsProject = ts.createProject(path.join(allianceTaskOptions.path, 'tsconfig.json'))
    es2015Preset = require('babel-preset-es2015');

module.exports = function() {
    return gulp.src([
        path.join(allianceTaskOptions.path, 'app', '**', '*'),
        path.join(allianceTaskOptions.path, 'typings', '**', '*.d.ts'),
        path.join(allianceTaskOptions.path, 'node_modules', 'alliance-bundle', 'typings', 'tsd.d.ts'),
        path.join(allianceTaskOptions.path, 'node_modules', 'alliance-bundle', 'alliance.d.ts')
    ])
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject, {}, reporter()))
    .pipe(babel({
        presets: [es2015Preset]
    }))
    .pipe(sourcemaps.write(path.join('.')))
	.pipe(gulp.dest(path.join(allianceTaskOptions.path, 'built')));
};
