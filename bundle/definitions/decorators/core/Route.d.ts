export declare enum RouteType {
    Action = 0,
    Controller = 1,
}
export declare class ActionDecorator {
    constructor(target: any, key: any, before: Function, after?: Function);
}
export declare class ControllerDecorator {
    constructor(target: any, before: Function, after?: Function);
}
export declare function Route(path: string, options?: Object): (target: any, key?: any) => void;
