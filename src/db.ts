import * as Sequelize  from 'sequelize'
import { Database, RelationshipType } from './components/database/database/Database'

// decorators
export { Table } from './decorators/db/Table';
export { hasOne, hasMany, belongsTo, belongsToMany } from './decorators/db/Relationships';
export { DAO } from './decorators/db/DAO';

// abstract classes
export { AbstractDAO } from './components/database/DAO/AbstractDAO';

// static functions
export { Query } from './components/database/database/Query';

// library
export { Sequelize as db }
export { Column } from './components/database/database/Columns';
export { ColumnType } from './components/database/database/Columns';
