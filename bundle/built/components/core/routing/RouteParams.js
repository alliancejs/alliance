'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ParamNames_1 = require('../../lib/ParamNames');
var ParamTypes_1 = require('../../../decorators/core/ParamTypes');

var RouteParams = (function () {
    function RouteParams(target, func, request, key) {
        _classCallCheck(this, RouteParams);

        this.target = target;
        this.func = func;
        this.request = request;
        this.key = key;
    }

    _createClass(RouteParams, [{
        key: 'build',
        value: function build() {
            var args = [];
            if (Reflect.hasMetadata(ParamTypes_1.allianceParams, this.target, this.key)) {
                this.paramNames = ParamNames_1.getParamNames(this.func);
                var argsList = Reflect.getMetadata(ParamTypes_1.allianceParams, this.target, this.key).sort(function (a, b) {
                    return a.parameterIndex > b.parameterIndex;
                });
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = argsList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var arg = _step.value;

                        switch (arg.type) {
                            case ParamTypes_1.allianceParamsType.PathVariable:
                                this.pathVariable(arg);
                                break;
                            case ParamTypes_1.allianceParamsType.RequestParam:
                                this.requestParam(arg);
                                break;
                            case ParamTypes_1.allianceParamsType.BodyParam:
                                this.bodyParam(arg);
                                break;
                            case ParamTypes_1.allianceParamsType.Inject:
                                this.inject(arg);
                                break;
                        }
                        args.push(this.value);
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
    }, {
        key: 'bodyParam',
        value: function bodyParam(arg) {
            this.value = this.request.body[this.paramNames[arg.parameterIndex]];
        }
    }, {
        key: 'inject',
        value: function inject(arg) {
            this.value = new arg.target();
        }
    }]);

    return RouteParams;
})();

exports.RouteParams = RouteParams;
//# sourceMappingURL=RouteParams.js.map
