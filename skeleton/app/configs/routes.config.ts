import { Routes } from './schema/routes.schema'

export default <Routes> {
    /**
     * Routes can be configured like the following:
     *
     * 'GET /': {
     *     controller: 'IndexController.index',
     *     layout: 'test'
     * },
     * 'GET /view/:id': {
     *     controller: 'IndexController.view'
     * }
     */

     'GET /view/:id': {
         controller: 'IndexController',
         action: 'index'
     }
};
