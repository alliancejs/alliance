import { AppConfigDatasource } from 'alliance/config';
import * as Sequelize from 'sequelize';
import { DecoratedTable, TableOptions, RelationshipInterface } from '../interfaces/Core';
export declare enum RelationshipType {
    hasMany = 0,
    hasOne = 1,
    belongsTo = 2,
    belongsToMany = 3,
}
export declare class Database {
    sequelize: Sequelize.Sequelize;
    datasource: AppConfigDatasource;
    models: WeakMap<DecoratedTable, any>;
    columns: WeakMap<DecoratedTable, Sequelize.DefineAttributes>;
    relationships: WeakMap<DecoratedTable, Set<RelationshipInterface>>;
    relationshipMethods: string[];
    DAO: WeakMap<any, any>;
    constructor();
    registerModel(target: any, table: any): void;
    getModel(target: any): any;
    registerTable(target: DecoratedTable, options: TableOptions): void;
    addRelationships(target: any): void;
    registerColumn(type: any, target: any, key: string): void;
    registerRelationship(target: any, key: string, type: RelationshipType, options: any): void;
}
export declare const database: Database;
