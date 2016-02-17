import { ControllerBuilder } from './core/controller/ControllerBuilder';
import { Server } from './core/server/Server';
import { Database } from './database/database/Database';

export const server: Server = new Server();
export const controllerBuilder: ControllerBuilder = new ControllerBuilder();
