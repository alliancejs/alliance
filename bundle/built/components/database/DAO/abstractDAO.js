'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var database_1 = require('../database/database');

var AbstractDAO = function AbstractDAO() {
    _classCallCheck(this, AbstractDAO);

    this.schema = database_1.database.getModel(this).schema;
    this.Query = database_1.database.getModel(this).model;
};

exports.AbstractDAO = AbstractDAO;
//# sourceMappingURL=abstractDAO.js.map
