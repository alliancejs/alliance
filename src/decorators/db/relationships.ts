import { Database, RelationshipType, database } from '../../components/database/database/database';

export function hasMany(target: Function, key?: string) {
    if (!key) { return (t, k) => database.registerRelationship(t, k, RelationshipType.hasMany, target) }
    database.registerRelationship(target, key, RelationshipType.hasMany, {});
}

export function hasOne(target: Function, key?: string) {
    if (!key) { return (t, k) => database.registerRelationship(t, k, RelationshipType.hasOne, target) }
    database.registerRelationship(target, key, RelationshipType.hasOne, {});
}

export function belongsTo(target: Function, key?: string) {
    if (!key) { return (t, k) => database.registerRelationship(t, k, RelationshipType.belongsTo, target) }
    database.registerRelationship(target, key, RelationshipType.belongsTo, {});
}

export function belongsToMany(target: Function, key?: string) {
    if (!key) { return (t, k) => database.registerRelationship(t, k, RelationshipType.belongsToMany, target) }
    database.registerRelationship(target, key, RelationshipType.belongsToMany, {});
}
