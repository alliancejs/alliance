export function Inject(target: any, key: string) {
    let type = Reflect.getMetadata("design:type", target, key);

    target.constructor.prototype[key] = new type();
}
