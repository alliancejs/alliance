import { AbstractController } from '../../components/core/controller/abstractController';
import { server } from '../../components/bundle';

export const allianceRoutes = Symbol("allianceRoutes");
export const allianceBasePath = Symbol("allianceBasePath");

export interface allianceRoute {
    path: string;
    key: string;
}

export function Route(path: string, methods: string[] = ['GET']) {
    return (target: any, key?: string, descriptor?: TypedPropertyDescriptor<any>) => {

        if (key) {
            let routes: allianceRoute[] = Reflect.getMetadata(allianceRoutes, target) || [];

            routes.push({
                path: path,
                key: key
            });

            Reflect.defineMetadata(allianceRoutes, routes, target);
        } else {
            Reflect.defineMetadata(allianceBasePath, path, target);
        }

    }
}
