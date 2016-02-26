'use strict';

var database_1 = require('../../components/database/database/database');
function hasMany(target, key) {
    if (!key) {
        return function (t, k) {
            return database_1.database.registerRelationship(t, k, database_1.RelationshipType.hasMany, target);
        };
    }
    database_1.database.registerRelationship(target, key, database_1.RelationshipType.hasMany, {});
}
exports.hasMany = hasMany;
function hasOne(target, key) {
    if (!key) {
        return function (t, k) {
            return database_1.database.registerRelationship(t, k, database_1.RelationshipType.hasOne, target);
        };
    }
    database_1.database.registerRelationship(target, key, database_1.RelationshipType.hasOne, {});
}
exports.hasOne = hasOne;
function belongsTo(target, key) {
    if (!key) {
        return function (t, k) {
            return database_1.database.registerRelationship(t, k, database_1.RelationshipType.belongsTo, target);
        };
    }
    database_1.database.registerRelationship(target, key, database_1.RelationshipType.belongsTo, {});
}
exports.belongsTo = belongsTo;
function belongsToMany(target, key) {
    if (!key) {
        return function (t, k) {
            return database_1.database.registerRelationship(t, k, database_1.RelationshipType.belongsToMany, target);
        };
    }
    database_1.database.registerRelationship(target, key, database_1.RelationshipType.belongsToMany, {});
}
exports.belongsToMany = belongsToMany;
//# sourceMappingURL=relationships.js.map
