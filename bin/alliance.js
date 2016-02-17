#!/usr/bin/env node

/**
 * Alliance : TypeScript framework for NodeJS (http://alliancejs.com)
 * Copyright (c) Eugene Pisotsky (http://alliancejs.com)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Eugene Pisotsky (http://alliancejs.com)
 * @link          http://alliancejs.com Alliance Project
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

var program = require('commander'),
    path = require('path');

/*program
    .version(require(path.join(__dirname, '..', 'package.json')).version);*/

/**
 * Run application command
 */
program
    .command('run')
    .option('--build', 'build before running')
    .option('--debug', 'debug mode with live reload')
    .option('--port [9000]', 'server port')
    .option('--path [cwd]', 'project directory')
    .description('Run application')
    .action(function() { return require('./run').apply(this, arguments) });

/**
 * Initialize project command
 */
program
    .command('init')
    .description('Сreate project in the current directory')
    .action(function() { return require('./init').apply(this, arguments) });

/**
 * Migrations commands
 */
program
    .command('migrations')
    .option('migrate [id]', 'execute migrations')
    .option('status', 'pending migrations')
    .option('rollback [id]', 'rollback migration')
    .description('Database migrations')
    .action(function() { return require('./migrations').apply(this, arguments) });

/**
 * Sources generator (controllers, actions, models)
 */
program
    .command('create')
    .option('--base [url]', 'controller: base url')
    .option('--actions [actions]', 'controller: actions list (example: "index@/ view@/view/:id delete@/delete/:id")')
    .description('Code generation')
    .action(function() { return require('./create').apply(this, arguments) });

/**
 * Run shell script
 */
program
    .command('shell [task]')
    .option('--path [cwd]', 'project directory')
    .description('Run shell task')
    .action(function() { return require('./shell').apply(this, arguments) });

/**
 * Build application command
 */
program
    .command('build')
    .description('Build current application')
    .action(function() { return require('./build').apply(this, arguments) });

program.parse(process.argv);
