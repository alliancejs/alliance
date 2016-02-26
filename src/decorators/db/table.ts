import { database } from '../../components/database/database/database';

export function Table(target) {
    if (typeof target !== 'function') {
        return (t: any) => database.registerTable(t, target)
    }

    database.registerTable(target, {});
}
