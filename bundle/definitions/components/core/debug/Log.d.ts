export declare class Log {
    static message(...message: any[]): void;
    static warning(...message: any[]): void;
    static error(...message: any[]): void;
    static success(...message: any[]): void;
    static event: {
        warning: string;
        error: string;
        info: string;
        request: string;
    };
}
