import { DecoratorsObject, DecoratedController } from '../interfaces/Core';
export declare enum DecoratorEvent {
    Before = 0,
    After = 1,
}
export declare class ControllerBuilder {
    actionDecorators: WeakMap<DecoratedController, Map<string, DecoratorsObject>>;
    controllerDecorators: WeakMap<DecoratedController, DecoratorsObject>;
    build(target: DecoratedController): void;
    registerActionDecorator(target: any, key: any, decoratorFunc: Function, afterFunc?: Function): void;
    registerControllerDecorator(target: any, decoratorFunc: Function, afterFunc?: Function): void;
}
