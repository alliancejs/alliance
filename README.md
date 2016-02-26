# Alliance

Alliance is a TypeScript framework for [Node.js](http://nodejs.org) based on [Express](http://expressjs.com), [Sequelize](http://sequelizejs.com) and [Handlebars](http://handlebarsjs.com).

***Alliance is currently in pre-alpha stage, no release versions are available!***

## Installation

To install the latest version with the command-line tool:

```bash
$ npm install alliance -g
```

## Creating a New Alliance Project

Create a new app:

```bash
$ cd /var/www/myproject
$ alliance init
```

Now fire up the server:

```bash
$ alliance run --debug
```

At this point, if you visit ([http://localhost:9000/](http://localhost:9000/)) you will see the default home page.

# Samples

Controller samples

## RESTful controller

```bash
$ alliance create controller news --actions "view=/[GET] update=/:user_id[UPDATE] delete=/:user_id[DELETE]" --base /users --restful
```

```typescript
@Controller
@Route('/users')
export class UsersController extends AppController {

    @Route('/:user_id')
    public view(@PathVariable user_id: number): Object {
        return {}       
    }

    @Route('/:user_id', 'UPDATE')
    public update(@PathVariable user_id: number, @BodyParam user: Object): Object {

        /**
         * user param extract `user` from json body:
         *
         * example:
         * {
         *     "id": 10,
         *     "user": {
         *         "first_name": "Roger",
         *         "last_name": "Davison",
         *     }
         * }
         *
         * user = {
         *     "first_name": "Roger",
         *     "last_name": "Davison",
         * }
         */

        return {}
    }

    @Route('/:user_id', 'DELETE')
    public delete(@PathVariable user_id: number): Object {
        return {}
    }

}
```

## Default controller

```bash
$ alliance create controller news --actions "index=/ view=/view/:id" --base /news
```

```typescript
@Controller
@Route('/news')
export class NewsController extends AppController {

    @Route('/')
    public index(): void {
        // this action will render app/src/views/news/index.hbs
    }

    @Route('/view/:id', 'UPDATE')
    public view(@PathVariable id: number): Object {
        // pass variable to handlebars context
        this.set('news_id', id);

        // this action will render app/src/views/news/view.hbs
    }

}
```
