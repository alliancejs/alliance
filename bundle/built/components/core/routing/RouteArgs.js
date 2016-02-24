'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ParamNames_1 = require('../../lib/ParamNames');
var ArgsTypes_1 = require('../../../decorators/core/ArgsTypes');

var RouteArgs = (function () {
    function RouteArgs(target, func, request, key) {
        _classCallCheck(this, RouteArgs);

        this.target = target;
        this.func = func;
        this.request = request;
        this.key = key;
    }

    _createClass(RouteArgs, [{
        key: 'build',
        value: function build() {
            var args = [];
            if (Reflect.hasMetadata(ArgsTypes_1.allianceArgs, this.target, this.key)) {
                this.paramNames = ParamNames_1.getParamNames(this.func);
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = Reflect.getMetadata(ArgsTypes_1.allianceArgs, this.target, this.key)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var arg = _step.value;

                        switch (arg.type) {
                            case ArgsTypes_1.allianceArgsType.PathVariable:
                                this.pathVariable(arg);
                                break;
                            case ArgsTypes_1.allianceArgsType.RequestParam:
                                this.requestParam(arg);
                                break;
                        }
                        args.splice(arg.parameterIndex, 0, this.value);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
            return args;
        }
    }, {
        key: 'pathVariable',
        value: function pathVariable(arg) {
            this.value = this.request.params[this.paramNames[arg.parameterIndex]];
        }
    }, {
        key: 'requestParam',
        value: function requestParam(arg) {
            this.value = this.request.query[this.paramNames[arg.parameterIndex]];
        }
    }]);

    return RouteArgs;
})();

exports.RouteArgs = RouteArgs;
//# sourceMappingURL=RouteArgs.js.map
