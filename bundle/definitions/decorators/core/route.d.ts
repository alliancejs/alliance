export declare const allianceRoutes: symbol;
export declare const allianceBasePath: symbol;
export interface allianceRoute {
    path: string;
    key: string;
}
export declare function Route(path: string, methods?: string[]): (target: any, key?: string, descriptor?: TypedPropertyDescriptor<any>) => void;
