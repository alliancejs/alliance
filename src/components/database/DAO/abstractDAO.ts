import * as Sequelize from 'sequelize';
import { database } from '../database/database';

export abstract class AbstractDAO<T> {

    schema: T = database.getModel(this).schema;
    Query: Sequelize.Model<T, any> = database.getModel(this).model;

}
