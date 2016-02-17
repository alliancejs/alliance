'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('reflect-metadata');
var config_1 = require('alliance/config');
var Sequelize = require('sequelize');
(function (RelationshipType) {
    RelationshipType[RelationshipType["hasMany"] = 0] = "hasMany";
    RelationshipType[RelationshipType["hasOne"] = 1] = "hasOne";
    RelationshipType[RelationshipType["belongsTo"] = 2] = "belongsTo";
    RelationshipType[RelationshipType["belongsToMany"] = 3] = "belongsToMany";
})(exports.RelationshipType || (exports.RelationshipType = {}));
var RelationshipType = exports.RelationshipType;

var Database = (function () {
    function Database() {
        _classCallCheck(this, Database);

        this.models = new WeakMap();
        this.columns = new WeakMap();
        this.relationships = new WeakMap();
        this.relationshipMethods = ['hasMany', 'hasOne', 'belongsTo', 'belongsToMany'];
        this.DAO = new WeakMap();
        this.datasource = config_1.default.datasources.default;
        if (this.datasource.dialect !== void 0) {
            this.sequelize = new Sequelize(this.datasource.database, this.datasource.username, this.datasource.password, this.datasource);
        }
        return this;
    }

    _createClass(Database, [{
        key: 'registerModel',
        value: function registerModel(target, table) {
            this.DAO.set(target, {
                schema: table,
                model: this.models.get(table)
            });
        }
    }, {
        key: 'getModel',
        value: function getModel(target) {
            return this.DAO.get(target.constructor);
        }
    }, {
        key: 'registerTable',
        value: function registerTable(target, options) {
            this.models.set(target, this.sequelize.define(options.name, this.columns.get(target), {}));
            this.addRelationships(target);
            if (allianceTaskOptions.debug) {
                this.sequelize.sync();
            }
        }
    }, {
        key: 'addRelationships',
        value: function addRelationships(target) {
            var includes = [];
            if (this.relationships.has(target)) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.relationships.get(target)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var rel = _step.value;

                        this.models.get(target)[this.relationshipMethods[rel.type]](this.models.get(rel.target), rel.options);
                        includes.push(this.models.get(rel.target));
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

                this.models.get(target).addScope('defaultScope', {
                    include: includes
                }, {
                    override: true
                });
            }
        }
    }, {
        key: 'registerColumn',
        value: function registerColumn(type, target, key) {
            var value = _defineProperty({}, key, {
                type: type
            });
            this.columns.set(target, this.columns.has(target) ? Object.assign(this.columns.get(target), value) : value);
        }
    }, {
        key: 'registerRelationship',
        value: function registerRelationship(target, key, type, options) {
            var relationship = {
                target: Reflect.getMetadata("design:type", target, key),
                options: options,
                type: type
            };
            target = target.constructor;
            this.relationships.set(target, this.relationships.has(target) ? this.relationships.get(target).add(relationship) : new Set([relationship]));
        }
    }]);

    return Database;
})();

exports.Database = Database;
exports.database = new Database();
//# sourceMappingURL=Database.js.map
