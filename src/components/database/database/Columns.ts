import * as sequelize  from 'sequelize';
import { Database, database } from './database';

export interface DataTypeAbstract {
    /**
     * Although this is not needed for the definitions itself, we want to make sure that DataTypeAbstract is not
     * something than can be evaluated to an empty object.
     */
    dialectTypes : string;
}

export interface DataTypeAbstractString<T> extends DataTypeAbstract {
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

export interface DataTypeString extends DataTypeAbstractString<any> { }
export interface DataTypeChar extends DataTypeAbstractString<any> { }
export interface DataTypeText extends DataTypeAbstract {
    /**
     * Length of the text field.
     *
     * Available lengths: `tiny`, `medium`, `long`
     */
    ( target: any, key: string ): any;
    ( options? : { length: string } ) : any;
    ( length : string ) : any;
}

export interface DataTypeAbstractNumber<T> extends DataTypeAbstract {
    UNSIGNED : T;
    ZEROFILL : T;
}

export interface DataTypeNumber extends DataTypeAbstractNumber<any> { }

export interface DataTypeInteger extends DataTypeAbstractNumber<any> {
    /**
     * Length of the number field.
     */
    ( target: any, key: string ): any;
    ( options? : { length: number } ) : any;
    ( length : number ) : any;
}

export interface DataTypeBigInt extends DataTypeAbstractNumber<any> {
    /**
     * Length of the number field.
     */
    ( target: any, key: string ): any;
    ( options? : { length: number } ) : any;
    ( length : number ) : any;
}

export interface DataTypeFloat extends DataTypeAbstractNumber<any> {
    /**
     * Length of the number field and decimals of the float
     */
    ( target: any, key: string ): any;
    ( options? : { length: number, decimals?: number } ) : any;
    ( length : number, decimals? : number ) : any;
}

export interface DataTypeReal extends DataTypeAbstractNumber<any> {
    /**
     * Length of the number field and decimals of the real
     */
    ( target: any, key: string ): any;
    ( options? : { length: number, decimals?: number } ) : any;
    ( length : number, decimals? : number ) : any;
}

export interface DataTypeDouble extends DataTypeAbstractNumber<any> {
    /**
     * Length of the number field and decimals of the real
     */
    ( target: any, key: string ): any;
    ( options? : { length: number, decimals?: number } ) : any;
    ( length : number, decimals? : number ) : any;
}

export interface DataTypeDecimal extends DataTypeAbstractNumber<any> {
    /**
     * Precision and scale for the decimal number
     */
    ( target: any, key: string ): any;
    ( options? : { precision: number, scale?: number } ) : any;
    ( precision : number, scale? : number ) : any;
}

export interface DataTypeBoolean extends DataTypeAbstract { }
export interface DataTypeTime extends DataTypeAbstract { }
export interface DataTypeDate extends DataTypeAbstract { }
export interface DataTypeDateOnly extends DataTypeAbstract { }
export interface DataTypeHStore extends DataTypeAbstract { }
export interface DataTypeJSONType extends DataTypeAbstract { }
export interface DataTypeJSONB extends DataTypeAbstract { }
export interface DataTypeNow extends DataTypeAbstract { }
export interface DataTypeBlob extends DataTypeAbstract {
    /**
     * Length of the blob field.
     *
     * Available lengths: `tiny`, `medium`, `long`
     */
    ( target: any, key: string ): any;
    ( options? : { length: string } ) : any;
    ( length : string ) : any;
}

export interface DataTypeRange extends DataTypeAbstract {
    /**
     * Range field for Postgre
     *
     * Accepts subtype any of the ranges
     */
    ( target: any, key: string ): any;
    ( options? : { subtype: DataTypeAbstract } ) : any;
    ( subtype : DataTypeAbstract ) : any;
}

export interface DataTypeUUID extends DataTypeAbstract { }
export interface DataTypeUUIDv1 extends DataTypeAbstract { }
export interface DataTypeUUIDv4 extends DataTypeAbstract { }
export interface DataTypeVirtual extends DataTypeAbstract { }
export interface DataTypeEnum extends DataTypeAbstract {
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

export interface DataTypeArray extends DataTypeAbstract {
    /**
     * Array field for Postgre
     *
     * Accepts type any of the DataTypes
     */
    ( target: any, key: string ): any;
    ( options : { type: DataTypeAbstract } ) : any;
    ( type : DataTypeAbstract ) : any;
}

export interface DataTypeGeometry extends DataTypeAbstract {
    /**
     * Geometry field for Postgres
     */
    ( target: any, key: string ): any;
    ( type : string, srid? : number ) : any;
}

export interface ColumnsInterface {
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

let cols: [string, sequelize.DataTypeAbstract][] = [
    ['string', sequelize.STRING],
    ['integer', sequelize.INTEGER],
    ['boolean', sequelize.BOOLEAN],
    ['char', sequelize.CHAR],
    ['text', sequelize.TEXT],
    ['bigint', sequelize.BIGINT],
    ['float', sequelize.FLOAT],
    ['real', sequelize.REAL],
    ['double', sequelize.DOUBLE],
    ['decimal', sequelize.DECIMAL],
    ['time', sequelize.TIME],
    ['date', sequelize.DATE],
    ['dateonly', sequelize.DATEONLY],
    ['hstore', sequelize.HSTORE],
    ['json', sequelize.JSON],
    ['jsonb', sequelize.JSONB],
    ['now', sequelize.NOW],
    ['blob', sequelize.BLOB],
    ['range', sequelize.RANGE],
    ['uuid', sequelize.UUID],
    ['uuidv4', sequelize.UUIDV4],
    ['virtual', sequelize.VIRTUAL],
    ['enum', sequelize.ENUM],
    ['array', sequelize.ARRAY],
    ['geometry', sequelize.GEOMETRY]
]

export let Column: ColumnsInterface = <ColumnsInterface> {};

for (let [key, value] of cols) {
    Column[key] = (...params): any => decorateColumn(value, ...params);
}

function decorateColumn(type: any, ...params): any {
    if (params[0] instanceof Object && params[0].constructor.name !== 'Object') {
        database.registerColumn(type, params[0].constructor, params[1]);
    } else {
        return (target, key) => {
            database.registerColumn(type(...params), target.constructor, key);
        }
    }
}
