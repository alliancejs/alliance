/**
 * Alliance : TypeScript framework for NodeJS (http://alliancejs.com)
 * Copyright (c) Eugene Pisotsky (http://alliancejs.com)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Eugene Pisotsky (http://alliancejs.com)
 * @link          http://alliancejs.com Alliance Project
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

import 'reflect-metadata';
import config, { AppConfigDatasource } from 'alliance/config';
import * as path  from 'path';
import * as Sequelize  from 'sequelize';
import { Logger } from '../../core/debug/logger';
import { Table } from './table';

import {
    Datasource,
    DecoratedTable,
    TableOptions,
    ColumnInterface,
    RelationshipInterface
} from '../interfaces/core';

export enum RelationshipType {
    hasMany,
    hasOne,
    belongsTo,
    belongsToMany
}

export class Database {
    sequelize: Sequelize.Sequelize;
    datasource: AppConfigDatasource;

    models: WeakMap<DecoratedTable, any> = new WeakMap();
    columns: WeakMap<DecoratedTable, Sequelize.DefineAttributes> = new WeakMap();
    relationships: WeakMap<DecoratedTable, Set<RelationshipInterface>> = new WeakMap();
    relationshipMethods: string[] = [ 'hasMany', 'hasOne', 'belongsTo', 'belongsToMany' ];

    DAO: WeakMap<any, any> = new WeakMap();

    /**
     * Initialize database connection if it`s configured
     */
    constructor() {
        this.datasource = config.datasources.default;

        if (this.datasource.dialect !== void 0) {

            // Create database connection
            this.sequelize = new Sequelize(this.datasource.database, this.datasource.username, this.datasource.password, this.datasource);

        }

        return this;
    }

    /**
     * Register model
     */
    public registerModel(target: any, table: any): void {
        this.DAO.set(target, {
            schema: table,
            model: this.models.get(table)
        });
    }

    /**
     * Get model by target class
     */
    public getModel(target: any): any {
        return this.DAO.get(target.constructor);
    }

    /**
     * Register table schema
     */
    public registerTable(target: DecoratedTable, options: TableOptions): void {
        this.models.set(
            target,
            this.sequelize.define(options.name, this.columns.get(target), {
                // default options
            })
        );

        this.addRelationships(target);

        // sync models in debug mode
        if (allianceTaskOptions.debug) { this.sequelize.sync() }
    }

    /**
     * Add relationships to sequelize model
     */
    public addRelationships(target: any): void {
        let includes: any[] = [];

        if (this.relationships.has(target)) {

            // iterate over model relationships
            for (const rel of this.relationships.get(target)) {
                this.models.get(target)[ this.relationshipMethods[rel.type] ](this.models.get(rel.target), rel.options)

                includes.push(
                    this.models.get(rel.target)
                );
            }

            this.models.get(target).addScope('defaultScope', {
                include: includes
            }, {
                override: true
            });

        }
    }

    /**
     * Register column for the model
     */
    public registerColumn(type: any, target: any, key: string): void {
        let value: Sequelize.DefineAttributes = {
            [key]: {
                type: type
            }
        };

        this.columns.set(
            target,
            this.columns.has(target) ? Object.assign(this.columns.get(target), value) : value
        );
    }

    /**
     * Register relationship
     */
    public registerRelationship(target: any, key: string, type: RelationshipType, options: any): void {
        let relationship: RelationshipInterface = {
            target: Reflect.getMetadata("design:type", target, key),
            options: options,
            type: type
        };

        target = target.constructor;

        this.relationships.set(
            target,
            this.relationships.has(target) ? this.relationships.get(target).add(relationship) : new Set([ relationship ])
        );
    }

}

export const database: Database = new Database();
