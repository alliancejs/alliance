'use strict';

var database_1 = require('./database');
function Query(table) {
    return database_1.database.models.get(table);
}
exports.Query = Query;
//# sourceMappingURL=query.js.map
