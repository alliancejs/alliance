export declare class ShellEngine {
    commands: WeakMap<any, Set<any>>;
    registerShell(target: any): void;
    registerCommand(): void;
}
