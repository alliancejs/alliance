import { database } from './Database';

export function Query(table: any) {
    return database.models.get(table);
}
