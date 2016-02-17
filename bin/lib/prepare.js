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

var path = require('path'),
    colors = require('colors'),
    npm = require('npm'),
    fs = require('fs-extra');

module.exports.checkVersion = function() {
    var versionGlobal = require(path.join(__dirname, '..', '..', 'package.json')).version,
        versionLocal = require(path.join(allianceTaskOptions.path, 'alliance.json')).version;

    if (versionLocal != versionGlobal) {
        console.log('Warning: Alliance version mismatch:'.bgYellow, '\n\n *'.gray, 'Running alliance is',
                    versionGlobal.magenta,
                    '\n *'.gray, 'Local alliance (defined in alliance.json) is',
                    versionLocal.magenta,
                    '\n\nYou can run', 'alliance upgrade'.cyan, 'command to upgrade your local alliance to the global version\n');
    }
}
