'use strict';

var Database_1 = require('../../components/database/database/Database');
function DAO(table) {
    return function (target) {
        Database_1.database.registerModel(target, table);
        return target;
    };
}
exports.DAO = DAO;
//# sourceMappingURL=DAO.js.map
