'use strict';

var Database_1 = require('./Database');
function Query(table) {
    return Database_1.database.models.get(table);
}
exports.Query = Query;
//# sourceMappingURL=Query.js.map
