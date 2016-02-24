import { Route } from '../../components/core/routing/Router';
import { allianceRoutes, allianceBasePath, allianceRoute } from './Route';

export function Controller(target: any) {

    // Build routes for controller
    if (Reflect.hasMetadata(allianceRoutes, target.prototype)) {
        for (const route of <allianceRoute[]> Reflect.getMetadata(allianceRoutes, target.prototype)) {
            let path: string = route.path;

            if (Reflect.hasOwnMetadata(allianceBasePath, target)) {
                path = Reflect.getMetadata(allianceBasePath, target) + route.path;
            }

            new Route(path, target, route.key);
        }
    }

}
