'use strict';

var Database_1 = require('../../components/database/database/Database');
function Table(target) {
    if (typeof target !== 'function') {
        return function (t) {
            return Database_1.database.registerTable(t, target);
        };
    }
    Database_1.database.registerTable(target, {});
}
exports.Table = Table;
//# sourceMappingURL=Table.js.map
