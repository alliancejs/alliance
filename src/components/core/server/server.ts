import * as http  from 'http';
import * as express  from 'express';
import * as path from 'path';

export class Server {

    express: express.Express = express();
    srv: http.Server;

    handlebars: any = require('express-handlebars');
    baseViewsDir: string = path.join(allianceTaskOptions.path, 'app', 'src', 'views');

    /**
     * Fire up the server and configure express application
     */
    constructor() {
        this.srv = this.express.listen(allianceTaskOptions.port, () => {

            let port: number = this.srv.address().port;

            console.log('* Server is listening on port'.green, port.toString().blue, '\n');

        });

        this.express.use(express.static(path.join(allianceTaskOptions.path, 'app', 'assets')))
                .set('views', this.baseViewsDir)
                .set('view engine', '.hbs')
                .engine('.hbs', <any> this.handlebars({
                    defaultLayout: path.join(this.baseViewsDir, 'layouts', 'main'),
                    partialsDir: path.join(this.baseViewsDir, 'partials'),
                    layoutsDir: path.join(this.baseViewsDir, 'layouts'),
                    extname: '.hbs'
                }));
    }
}
