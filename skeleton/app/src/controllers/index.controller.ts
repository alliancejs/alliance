import { Controller, Route } from 'alliance/core';
import { AppController } from './app.controller';

@Controller
export class IndexController extends AppController {

    @Route('/')
    public index(): void {
        // Index action code
    }

}
