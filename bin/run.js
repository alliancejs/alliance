/**
 * Alliance : TypeScript framework for NodeJS (http://alliancejs.com)
 * Copyright (c) Eugene Pisotsky (http://alliancejs.com)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Eugene Pisotsky (http://alliancejs.com)
 * @link          http://alliancejs.com Alliance Project
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

var process = require('process'),
    gulp = require('gulp'),
    http = require('http'),
    path = require('path'),
    fs = require('fs-extra'),
    npm = require('npm'),
    colors = require('colors'),
    findParentDir = require('find-parent-dir'),
    prepare = require('./lib/prepare'),
    mock = require('mock-require');

/**
 * Init sourcemaps, build project and require sources
 */
module.exports = function(options) {
    require('source-map-support').install();
    require('./lib/task-options')(options);

    var run = function() {
        if (allianceTaskOptions.debug)
            gulp.start('project-watch', function(){
                // watcher
            });
        else
            require('./lib/require-project')(localAlliancePath, allianceTaskOptions);
    }

    // prepare.checkVersion();

    if (options.build || options.debug) {
        require(path.join('..', 'gulpfile.js'));
        console.log('Build application...'.gray);

        gulp.start('project-build', function(){
            run();
        });
    } else {
        run();
    }
};
