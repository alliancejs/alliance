import * as Sequelize  from 'sequelize'
import { Database, RelationshipType } from './components/database/database/database'

// decorators
export { Table } from './decorators/db/table';
export { hasOne, hasMany, belongsTo, belongsToMany } from './decorators/db/relationships';
export { DAO } from './decorators/db/DAO';

// abstract classes
export { AbstractDAO } from './components/database/DAO/abstractDAO';

// static functions
export { Query } from './components/database/database/query';

// library
export { Sequelize as db }
export { Column } from './components/database/database/columns';
export { ColumnType } from './components/database/database/columns';
