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
    process = require('process'),
    mock = require('mock-require');

process.stdout.isTTY = true;

global.allianceTaskOptions = {
    port: process.argv.pop(),
    debug: process.argv.pop() === 'true',
    path: process.argv.pop(),
};

require('source-map-support').install({
    environment: 'node'
});

require('./lib/require-project')(
    path.join(allianceTaskOptions.path, 'node_modules', 'alliance-bundle', 'built'),
    allianceTaskOptions
);
