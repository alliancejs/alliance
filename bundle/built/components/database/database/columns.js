'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var sequelize = require('sequelize');
var database_1 = require('./database');
var cols = [['string', sequelize.STRING], ['integer', sequelize.INTEGER], ['boolean', sequelize.BOOLEAN], ['char', sequelize.CHAR], ['text', sequelize.TEXT], ['bigint', sequelize.BIGINT], ['float', sequelize.FLOAT], ['real', sequelize.REAL], ['double', sequelize.DOUBLE], ['decimal', sequelize.DECIMAL], ['time', sequelize.TIME], ['date', sequelize.DATE], ['dateonly', sequelize.DATEONLY], ['hstore', sequelize.HSTORE], ['json', sequelize.JSON], ['jsonb', sequelize.JSONB], ['now', sequelize.NOW], ['blob', sequelize.BLOB], ['range', sequelize.RANGE], ['uuid', sequelize.UUID], ['uuidv4', sequelize.UUIDV4], ['virtual', sequelize.VIRTUAL], ['enum', sequelize.ENUM], ['array', sequelize.ARRAY], ['geometry', sequelize.GEOMETRY]];
exports.Column = {};
exports.ColumnType = {};
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    var _loop = function _loop() {
        var _step$value = _slicedToArray(_step.value, 2);

        var key = _step$value[0];
        var value = _step$value[1];

        exports.Column[key] = function () {
            for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                params[_key2] = arguments[_key2];
            }

            return decorateColumn.apply(undefined, [value].concat(params));
        };
        exports.ColumnType[key] = value;
    };

    for (var _iterator = cols[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        _loop();
    }
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}

function decorateColumn(type) {
    for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
    }

    if (params[0] instanceof Object && params[0].constructor.name !== 'Object') {
        database_1.database.registerColumn(type, params[0].constructor, params[1]);
    } else {
        return function (target, key) {
            database_1.database.registerColumn(type.apply(undefined, params), target.constructor, key);
        };
    }
}
//# sourceMappingURL=columns.js.map
