'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var express = require('express');
var path = require('path');

var Server = function Server() {
    var _this = this;

    _classCallCheck(this, Server);

    this.express = express();
    this.handlebars = require('express-handlebars');
    this.baseViewsDir = path.join(allianceTaskOptions.path, 'app', 'src', 'views');
    this.srv = this.express.listen(allianceTaskOptions.port, function () {
        var port = _this.srv.address().port;
        console.log('* Server is listening on port'.green, port.toString().blue, '\n');
    });
    this.express.use(express.static(path.join(allianceTaskOptions.path, 'app', 'assets'))).set('views', this.baseViewsDir).set('view engine', '.hbs').engine('.hbs', this.handlebars({
        defaultLayout: path.join(this.baseViewsDir, 'layouts', 'main'),
        partialsDir: path.join(this.baseViewsDir, 'partials'),
        layoutsDir: path.join(this.baseViewsDir, 'layouts'),
        extname: '.hbs'
    }));
};

exports.Server = Server;
//# sourceMappingURL=server.js.map
