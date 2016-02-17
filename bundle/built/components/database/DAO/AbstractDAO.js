'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Database_1 = require('../database/Database');

var AbstractDAO = function AbstractDAO() {
    _classCallCheck(this, AbstractDAO);

    this.schema = Database_1.database.getModel(this).schema;
    this.Query = Database_1.database.getModel(this).model;
};

exports.AbstractDAO = AbstractDAO;
//# sourceMappingURL=AbstractDAO.js.map
