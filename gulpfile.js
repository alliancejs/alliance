var gulp = require('gulp'),
    path = require('path'),
    dts = require('dts-bundle'),
    findParentDir = require('find-parent-dir');

if (typeof allianceTaskOptions === 'undefined') {
    global.allianceTaskOptions = {
        path: findParentDir.sync(process.cwd(), 'alliance.json')
    };
}

// Project tasks
gulp.task('project-build', function() { return require('./tasks/project-build')() });
gulp.task('project-watch', function() { return require('./tasks/project-watch')() });

// Framework tasks
gulp.task('framework-build', ['framework-build-base'], function() {
    require('./tasks/definitions')();
});
gulp.task('framework-build-base', function() { return require('./tasks/framework-build')() });
gulp.task('framework-watch', function() { return require('./tasks/framework-watch')() });
