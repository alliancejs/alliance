import * as Sequelize from 'sequelize';
export declare abstract class AbstractDAO<T> {
    schema: T;
    Query: Sequelize.Model<T, any>;
}
