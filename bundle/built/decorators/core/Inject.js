"use strict";

function Inject(target, key) {
    var type = Reflect.getMetadata("design:type", target, key);
    target.constructor.prototype[key] = new type();
}
exports.Inject = Inject;
//# sourceMappingURL=Inject.js.map
