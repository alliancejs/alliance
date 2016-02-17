import { RelationshipType } from '../database/Database';

export interface Datasource {
    database: string;
    username: string;
    password: string;
    host: string;
    port: number;
    dialect: string;
    define: Object;
}

export interface DecoratedTable {
    new();
}

export interface TableOptions {
    name?: string;
}

export interface ColumnInterface {
    [field: string]: Object;
}

export interface RelationshipInterface {
    target: any,
    type: RelationshipType,
    options: any
}
