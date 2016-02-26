import { database } from './database';

export function Query(table: any) {
    return database.models.get(table);
}
