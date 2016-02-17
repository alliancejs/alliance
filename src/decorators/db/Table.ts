import { database } from '../../components/database/database/Database';

export function Table(target) {
    if (typeof target !== 'function') {
        return (t: any) => database.registerTable(t, target)
    }

    database.registerTable(target, {});
}
