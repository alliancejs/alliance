'use strict';

var Database_1 = require('../../components/database/database/Database');
function hasMany(target, key) {
    if (!key) {
        return function (t, k) {
            return Database_1.database.registerRelationship(t, k, Database_1.RelationshipType.hasMany, target);
        };
    }
    Database_1.database.registerRelationship(target, key, Database_1.RelationshipType.hasMany, {});
}
exports.hasMany = hasMany;
function hasOne(target, key) {
    if (!key) {
        return function (t, k) {
            return Database_1.database.registerRelationship(t, k, Database_1.RelationshipType.hasOne, target);
        };
    }
    Database_1.database.registerRelationship(target, key, Database_1.RelationshipType.hasOne, {});
}
exports.hasOne = hasOne;
function belongsTo(target, key) {
    if (!key) {
        return function (t, k) {
            return Database_1.database.registerRelationship(t, k, Database_1.RelationshipType.belongsTo, target);
        };
    }
    Database_1.database.registerRelationship(target, key, Database_1.RelationshipType.belongsTo, {});
}
exports.belongsTo = belongsTo;
function belongsToMany(target, key) {
    if (!key) {
        return function (t, k) {
            return Database_1.database.registerRelationship(t, k, Database_1.RelationshipType.belongsToMany, target);
        };
    }
    Database_1.database.registerRelationship(target, key, Database_1.RelationshipType.belongsToMany, {});
}
exports.belongsToMany = belongsToMany;
//# sourceMappingURL=Relationships.js.map
