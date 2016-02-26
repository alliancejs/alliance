import { database } from '../../components/database/database/database';

export function DAO(table: any) {
    return (target) => {
        database.registerModel(target, table);
        return target;
    }
}
