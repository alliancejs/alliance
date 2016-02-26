'use strict';

var database_1 = require('../../components/database/database/database');
function DAO(table) {
    return function (target) {
        database_1.database.registerModel(target, table);
        return target;
    };
}
exports.DAO = DAO;
//# sourceMappingURL=DAO.js.map
