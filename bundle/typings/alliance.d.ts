declare var allianceTaskOptions: {
    port: number;
    debug: boolean;
    path: string;
    config: string;
};

declare module "alliance/config" {
    import * as sequelize from 'sequelize';

    interface CustomizableSection {
        [param: string]: any;
    }

    interface AppConfigDatasources {
        default: AppConfigDatasource;
        [name: string]: AppConfigDatasource;
    }

    interface AppConfigLogging extends CustomizableSection {
        active: boolean;
        class: Function;
    }

    interface AppConfigPaths extends CustomizableSection {
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
            controller: string;
            layout?: string;
            template?: string;
        }
    }

    export interface AbstractApplicationConfig extends CustomizableSection {
        basePath: string;
        logging: AppConfigLogging;
        datasources: AppConfigDatasources;
        initialize?: (app) => void;
    }

    var config: AbstractApplicationConfig;
    export default config;
}

declare module "alliance/core" {
    import * as express from 'express';
    import * as http  from 'http';

    export type Response = express.Response;

    interface DecoratorFunc {
        (pipe: DecoratorPipe): void;
    }

    interface CoreApplication {
        express: express.Express;
        srv: http.Server;

        registerActionDecorator(target: any, key: any, decoratorFunc: DecoratorFunc, afterFunc?: DecoratorFunc): void;
        registerControllerDecorator(target: any, decoratorFunc: DecoratorFunc, afterFunc?: DecoratorFunc): void;
    }

    interface Alliance {
        new();

        app: express.Express;
        srv: http.Server;
    }

    export interface DecoratorCallback {
        (pipe: DecoratorPipe): any;
    }

    export interface DecoratorPipe {
        next: Function;
        reject: Function;
        context: AbstractController;
        key: string;
        result: any;
    }

    export interface LogEvents {
        warning: string;
        error: string;
        info: string;
        database_query: string;
        request: string;
    }

    export interface AbstractController {
        new(): this;

        app: express.Express;
        request: express.Request;
        response: express.Response;
        meta: any;

        template: string;
        layout: string | boolean;

        set(key: string, value: any);
        set(variables: Object);
    }

    export class ActionDecorator {
        constructor (target, key, decoratorFunc: DecoratorFunc, afterFunc?: DecoratorFunc);
    }

    export class ControllerDecorator {
        constructor (target, decoratorFunc: DecoratorFunc, afterFunc?: DecoratorFunc);
    }

    export class Log {
        public static message(message: string[] | string): void;
        public static warning(message: string[] | string): void;
        public static success(message: string[] | string): void;
        public static error(message: string[] | string): void;

        public static event: LogEvents;
    }

    export function Application(target: any);
    export function Controller(target: Function);
    export function Route(path: string, methods?: string[]);
    export function Route(path: string, method?: string);
    export function Inject(...params);

    export function actionDecorator(callback: (context, options) => Promise<any>): void;

    export var Alliance: Alliance;
    export var App: CoreApplication;
    export var AbstractController: AbstractController;
}

declare module "alliance/db" {
    import * as sequelize from "sequelize";

    export type QueryInterface = sequelize.QueryInterface;

    interface DataTypeAbstract {
        /**
         * Although this is not needed for the definitions itself, we want to make sure that DataTypeAbstract is not
         * something than can be evaluated to an empty object.
         */
        dialectTypes : string;
    }

    interface DataTypeAbstractString<T> extends DataTypeAbstract {
        /**
         * A variable length string. Default length 255
         */
        ( target: any, key: string ): any;
        ( options? : { length: number } ) : T;
        ( length : number ) : T;

        /**
         * Property BINARY for the type
         */
        BINARY : T;
    }

    interface DataTypeString extends DataTypeAbstractString<any> { }
    interface DataTypeChar extends DataTypeAbstractString<any> { }
    interface DataTypeText extends DataTypeAbstract {
        /**
         * Length of the text field.
         *
         * Available lengths: `tiny`, `medium`, `long`
         */
        ( target: any, key: string ): any;
        ( options? : { length: string } ) : any;
        ( length : string ) : any;
    }

    interface DataTypeAbstractNumber<T> extends DataTypeAbstract {
        UNSIGNED : T;
        ZEROFILL : T;
    }

    interface DataTypeNumber extends DataTypeAbstractNumber<any> { }

    interface DataTypeInteger extends DataTypeAbstractNumber<any> {
        /**
         * Length of the number field.
         */
        ( target: any, key: string ): any;
        ( options? : { length: number } ) : any;
        ( length : number ) : any;
    }

    interface DataTypeBigInt extends DataTypeAbstractNumber<any> {
        /**
         * Length of the number field.
         */
        ( target: any, key: string ): any;
        ( options? : { length: number } ) : any;
        ( length : number ) : any;
    }

    interface DataTypeFloat extends DataTypeAbstractNumber<any> {
        /**
         * Length of the number field and decimals of the float
         */
        ( target: any, key: string ): any;
        ( options? : { length: number, decimals?: number } ) : any;
        ( length : number, decimals? : number ) : any;
    }

    interface DataTypeReal extends DataTypeAbstractNumber<any> {
        /**
         * Length of the number field and decimals of the real
         */
        ( target: any, key: string ): any;
        ( options? : { length: number, decimals?: number } ) : any;
        ( length : number, decimals? : number ) : any;
    }

    interface DataTypeDouble extends DataTypeAbstractNumber<any> {
        /**
         * Length of the number field and decimals of the real
         */
        ( target: any, key: string ): any;
        ( options? : { length: number, decimals?: number } ) : any;
        ( length : number, decimals? : number ) : any;
    }

    interface DataTypeDecimal extends DataTypeAbstractNumber<any> {
        /**
         * Precision and scale for the decimal number
         */
        ( target: any, key: string ): any;
        ( options? : { precision: number, scale?: number } ) : any;
        ( precision : number, scale? : number ) : any;
    }

    interface DataTypeBoolean extends DataTypeAbstract { }
    interface DataTypeTime extends DataTypeAbstract { }
    interface DataTypeDate extends DataTypeAbstract { }
    interface DataTypeDateOnly extends DataTypeAbstract { }
    interface DataTypeHStore extends DataTypeAbstract { }
    interface DataTypeJSONType extends DataTypeAbstract { }
    interface DataTypeJSONB extends DataTypeAbstract { }
    interface DataTypeNow extends DataTypeAbstract { }
    interface DataTypeBlob extends DataTypeAbstract {
        /**
         * Length of the blob field.
         *
         * Available lengths: `tiny`, `medium`, `long`
         */
        ( target: any, key: string ): any;
        ( options? : { length: string } ) : any;
        ( length : string ) : any;
    }

    interface DataTypeRange extends DataTypeAbstract {
        /**
         * Range field for Postgre
         *
         * Accepts subtype any of the ranges
         */
        ( target: any, key: string ): any;
        ( options? : { subtype: DataTypeAbstract } ) : any;
        ( subtype : DataTypeAbstract ) : any;
    }

    interface DataTypeUUID extends DataTypeAbstract { }
    interface DataTypeUUIDv1 extends DataTypeAbstract { }
    interface DataTypeUUIDv4 extends DataTypeAbstract { }
    interface DataTypeVirtual extends DataTypeAbstract { }
    interface DataTypeEnum extends DataTypeAbstract {
        /**
         * Enum field
         *
         * Accepts values
         */
        ( target: any, key: string ): any;
        ( options? : { values: string | string[] } ) : any;
        ( values : string | string[] ) : any;
        ( ...args : string[] ) : any;
    }

    interface DataTypeArray extends DataTypeAbstract {
        /**
         * Array field for Postgre
         *
         * Accepts type any of the DataTypes
         */
        ( target: any, key: string ): any;
        ( options : { type: DataTypeAbstract } ) : any;
        ( type : DataTypeAbstract ) : any;
    }

    interface DataTypeGeometry extends DataTypeAbstract {
        /**
         * Geometry field for Postgres
         */
        ( target: any, key: string ): any;
        ( type : string, srid? : number ) : any;
    }

    export interface Columns {
        string: DataTypeString;
        integer: DataTypeInteger;
        boolean: DataTypeInteger;
        char: DataTypeChar;
        text: DataTypeText;
        bigint: DataTypeBigInt;
        float: DataTypeFloat;
        real: DataTypeReal;
        double: DataTypeDouble;
        decimal: DataTypeDecimal;
        time: DataTypeTime;
        date: DataTypeDate;
        dateonly: DataTypeDateOnly;
        hstore: DataTypeHStore;
        json: DataTypeJSONType;
        jsonb: DataTypeJSONB;
        now: DataTypeNow;
        blob: DataTypeBlob;
        range: DataTypeRange;
        uuid: DataTypeUUID;
        uuidv4: DataTypeUUIDv4;
        virtual: DataTypeVirtual;
        enum: DataTypeEnum;
        array: DataTypeArray;
        geometry: DataTypeGeometry;
    }

    export interface ColumnOptions {
        type: string | DataTypeAbstract;
        unique?: boolean | string | { name: string, msg: string };
        primaryKey?: boolean;
        autoIncrement?: boolean;
        comment?: string;
        references? : sequelize.DefineAttributeColumnReferencesOptions;
        onUpdate? : string;
        onDelete? : string;
        get? : () => any;
        set? : ( val : any ) => void;
        validate? : sequelize.DefineValidateOptions;
        values? : Array<string>;
    }

    export class AbstractMigration {
        queryInterface: sequelize.QueryInterface;
        sequelize: sequelize.Sequelize;
    }

    export class AbstractDAO<T> {
        schema: T;
        Query: sequelize.Model<T, any>;
    }

    export function Table(options?: any);
    export function DAO(target: any);
    export function belongsTo(target: any, key: string);
    export function belongsTo(options: sequelize.AssociationOptionsBelongsTo);
    export function hasOne(target: any, key: string);
    export function hasOne(options: sequelize.AssociationOptionsBelongsTo);
    export function hasMany(target: any, key: string);
    export function hasMany(options: sequelize.AssociationOptionsHasMany);
    export function belongsToMany(target: any, key: string);
    export function belongsToMany(options: sequelize.AssociationOptionsBelongsToMany);
    export function Query<T>(table: any): sequelize.Model<T, any>;

    export var db: sequelize.SequelizeStatic;
    export var ColumnType: Columns;
    export var Column: Columns;
}

declare module "alliance/views" {

}

declare module "alliance/shell" {
    export function Shell(target: any);
    export function Command(target: any, key?: string);

    export class AbstractShell {

    }
}
