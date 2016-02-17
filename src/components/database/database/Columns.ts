import * as sequelize  from 'sequelize';
import { Database, database } from './Database';

let cols: [string, sequelize.DataTypeAbstract][] = [
    ['string', sequelize.STRING],
    ['integer', sequelize.INTEGER],
    ['boolean', sequelize.BOOLEAN],
    ['char', sequelize.CHAR],
    ['text', sequelize.TEXT],
    ['bigint', sequelize.BIGINT],
    ['float', sequelize.FLOAT],
    ['real', sequelize.REAL],
    ['double', sequelize.DOUBLE],
    ['decimal', sequelize.DECIMAL],
    ['time', sequelize.TIME],
    ['date', sequelize.DATE],
    ['dateonly', sequelize.DATEONLY],
    ['hstore', sequelize.HSTORE],
    ['json', sequelize.JSON],
    ['jsonb', sequelize.JSONB],
    ['now', sequelize.NOW],
    ['blob', sequelize.BLOB],
    ['range', sequelize.RANGE],
    ['uuid', sequelize.UUID],
    ['uuidv4', sequelize.UUIDV4],
    ['virtual', sequelize.VIRTUAL],
    ['enum', sequelize.ENUM],
    ['array', sequelize.ARRAY],
    ['geometry', sequelize.GEOMETRY]
]

export let Column: Object = {};
export let ColumnType: Object = {};

for (let [key, value] of cols) {
    Column[key] = (...params): any => decorateColumn(value, ...params);
    ColumnType[key] = value;
}

function decorateColumn(type: any, ...params): any {
    if (params[0] instanceof Object && params[0].constructor.name !== 'Object') {
        database.registerColumn(type, params[0].constructor, params[1]);
    } else {
        return (target, key) => {
            database.registerColumn(type(...params), target.constructor, key);
        }
    }
}
