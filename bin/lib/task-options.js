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
    path = require('path'),
    findParentDir = require('find-parent-dir');

module.exports = function(options) {
    var parentDir = findParentDir.sync(process.cwd(), 'alliance.json');

    global.allianceTaskOptions = {
        port: options.port || 9000,
        debug: options.debug || false,
        path: options.path || parentDir,
        config: options.config || path.join(parentDir, 'built', 'configs', 'app.config')
    };

    global.localAlliancePath = path.join(allianceTaskOptions.path, 'node_modules', 'alliance-bundle', 'built');
}
