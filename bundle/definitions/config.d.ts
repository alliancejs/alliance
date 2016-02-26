import * as sequelize from 'sequelize';
export interface CustomizableSection {
    [param: string]: any;
}
export interface AppConfigDatasources {
    default: AppConfigDatasource;
    [name: string]: AppConfigDatasource;
}
export interface AppConfigLogging extends CustomizableSection {
    active: boolean;
    class: Function;
}
export interface AppConfigPaths extends CustomizableSection {
    assets?: string;
}
export interface AppConfigDatasource extends sequelize.Options {
    username?: string;
    password?: string;
    database?: string;
    encoding?: string;
}
export interface AbstractRoutesConfig extends CustomizableSection {
    [route: string]: {
        controller: Function;
        action: string;
        template?: string;
        layout?: string;
    };
}
export interface AbstractApplicationConfig extends CustomizableSection {
    basePath: string;
    logging: AppConfigLogging;
    datasources: AppConfigDatasources;
    initialize?: (app) => void;
}
declare var config: AbstractApplicationConfig;
export default config;
