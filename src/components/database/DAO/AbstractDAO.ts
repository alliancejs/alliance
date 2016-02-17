import * as Sequelize from 'sequelize';
import { database } from '../database/Database';

export abstract class AbstractDAO<T> {

    schema: T = database.getModel(this).schema;
    Query: Sequelize.Model<T, any> = database.getModel(this).model;

}
