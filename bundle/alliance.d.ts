/// <reference path="./typings/tsd.d.ts"/>
/// <reference path="./definitions/alliance/core.d.ts"/>
/// <reference path="./definitions/alliance/db.d.ts"/>
/// <reference path="./definitions/alliance/shell.d.ts"/>
/// <reference path="./definitions/alliance/views.d.ts"/>
/// <reference path="./definitions/alliance/config.d.ts"/>
/// <reference path="./reflect-metadata.d.ts"/>

declare var allianceTaskOptions: {
    port: number;
    debug: boolean;
    path: string;
    config: string;
};

declare type Reflect = any;
