'use strict';

var database_1 = require('../../components/database/database/database');
function Table(target) {
    if (typeof target !== 'function') {
        return function (t) {
            return database_1.database.registerTable(t, target);
        };
    }
    database_1.database.registerTable(target, {});
}
exports.Table = Table;
//# sourceMappingURL=table.js.map
