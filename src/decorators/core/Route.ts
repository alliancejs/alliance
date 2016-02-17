import { DecoratorCallback } from 'alliance/core';
import { controllerBuilder, server } from '../../components/Bundle';
import { Router } from '../../components/core/routing/Router';

export enum RouteType { Action, Controller }

export class ActionDecorator {
    constructor(target, key, before: Function, after?: Function) {
        controllerBuilder.registerActionDecorator(target, key, before, after);
        return () => void 0;
    }
}

export class ControllerDecorator {
    constructor(target, before: Function, after?: Function) {
        controllerBuilder.registerControllerDecorator(target, before, after);
        return () => void 0;
    }
}

export function Route(path: string, options: Object) {
    let actionClass: Router;
    let actionPath: string = path;

    let callbacks: { before: (type) => DecoratorCallback, after: DecoratorCallback } = {
            before: type =>
                    pipe => {

                if (type === RouteType.Action) {
                    if (pipe.context.meta._routeBasePath) {
                        actionPath = pipe.context.meta._routeBasePath + actionPath;
                    }

                    server.express.all(actionPath, (req, res, expressNext) => {
                        actionClass = new Router(pipe.context, pipe.key, req, res, expressNext);
                        pipe.next();
                    });
                } else {
                    pipe.context.meta._routeBasePath = path;
                    pipe.next();
                }

            },

            after: pipe => {
                actionClass.actionResult = pipe.result;

                server.express.all(actionPath, (req, res) => {
                    actionClass.render(req, res);
                    pipe.next();
                });

                actionClass.execute();
            }
        };

    return (target, key?) => {
        if (key) {
            new ActionDecorator(target, key, callbacks.before(RouteType.Action), callbacks.after)
        } else {
            new ControllerDecorator(target, callbacks.before(RouteType.Controller))
        }
    }
}
