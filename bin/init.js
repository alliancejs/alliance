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

module.exports = function() {
    var fs = require('fs-extra'),
        process = require('process'),
        path = require('path'),
        colors = require('colors'),
        prompt = require('prompt'),
        findParentDir = require('find-parent-dir'),
        npm = require("npm"),
        exec = require('child_process').exec;

    var initialize = function() {
        console.log('creating an application skeleton...'.cyan);

        // copy application skeleton
        fs.copy(path.join(__dirname, '..', 'skeleton'), process.cwd(), function (err) {
            if (err)
                console.log(err);

            // create base config file
            var config = {
                version: require(path.join(__dirname, '..', 'package.json')).version
            };

            fs.writeFile(path.join(process.cwd(), 'alliance.json'), JSON.stringify(config, null, 4), function(err) {
                if (err)
                    console.error(err);

                npm.load({
                    loaded: false
                }, function (err) {
                    // catch errors
                    npm.commands.install(createDependenciesList(path.join(process.cwd(), 'package.json')), function (er, data) {
                        // log the error or data
                    });
                    npm.on("log", function (message) {
                        // log the progress of the installation
                        console.log(message);
                    });
                });
            });
        });
    }

    var createDependenciesList = function (packageFilePath) {
        var p = require(packageFilePath);
        if (!p.dependencies) return [];

        var deps = [];
        for (var mod in p.dependencies) {
            deps.push(mod + "@" + p.dependencies[mod]);
        }

        return deps;
    }

    // check if directory already initialized
    if (findParentDir.sync(process.cwd(), 'alliance.json')) {
        var description = '\nProject was already initialized in current directory. Are you sure you want to override your old project? ' + '(Y/N)\n'.magenta;
        var schema = {
            properties: {
                confirm: {
                    description: description,
                    pattern: /^[YNyn]+$/,
                    message: 'Answer must be N or Y',
                    default: 'N',
                    required: false
                }
            }
        };

        prompt.start();

        prompt.get(schema, function (err, result) {
            if (['Y', 'y'].indexOf(result.confirm) != -1) initialize();
        });
    } else {
        initialize();
    }
}
