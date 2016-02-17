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

var path = require('path');

module.exports = function(command, value) {
    require('./lib/task-options')({});

    var migrations = require(path.join('..', 'built', 'components', 'Database', 'migrations'))
    var Migrations = new migrations.Migrations();

    switch (command) {
        case "status":
            Migrations.pending().then(function(list) {
                console.log(list);
            });
        break;
        case "migrate":
            console.log('start migrations');
            Migrations.execute().then(function(list) {
                console.log(list);
            });
        break;
    }
}
