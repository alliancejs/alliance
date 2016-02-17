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

var mock = require('mock-require'),
    path = require('path');

module.exports = function(localAlliancePath, allianceTaskOptions) {
    // require('use-strict');

    require("babel-polyfill");

    mock('alliance/core', path.join(localAlliancePath, 'core'));
    mock('alliance/config', path.join(allianceTaskOptions.path, 'built', 'configs', 'app.config'));
    mock('alliance/views', path.join(localAlliancePath, 'views'));
    mock('alliance/shell', path.join(localAlliancePath, 'shell'));
    mock('alliance/db', path.join(localAlliancePath, 'db'));

    require('require-all')({
        dirname     :  path.join(allianceTaskOptions.path, 'built', 'src', 'controllers'),
        excludeDirs :  /^\.(git|svn)$/,
        recursive   : true
    });
}
