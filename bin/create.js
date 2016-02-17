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

 var handlebars = require('handlebars'),
     fs = require('fs'),
     colors = require('colors'),
     path = require('path');

 String.prototype.toUpperCaseFirstChar = function() {
     return this.substr( 0, 1 ).toUpperCase() + this.substr( 1 );
 }

 String.prototype.toCamelCase = function() {
    return this.replace(/^([A-Z])|[\s-_](\w)/g, function(match, p1, p2, offset) {
        if (p2) return p2.toUpperCase();
        return p1.toLowerCase();
    });
};

String.prototype.toUnderscore = function(){
	return this.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});
};

 /**
  * Project generator
  */
module.exports = function(method, name, options) {
    require('./lib/task-options')(options);

    var writeFile = function(p, content) {
        fs.writeFile(path.join(allianceTaskOptions.path, p), content, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log('write file:'.green, p.blue);
        });
    }

    var templatesPath = path.join(__dirname, '..', 'src', 'templates');
    var methods = {
        /**
         * Generate controller
         *
         * usage: alliance create controller news --actions "index=/ view=/view/:id" --base /news
         */
        controller: function() {
            var template = handlebars.compile(fs.readFileSync(path.join(templatesPath, 'controller.hbs')).toString());
            var context = {
                base: options.base,
                name: name.toCamelCase().toUpperCaseFirstChar(),
                actions: []
            }

            if (options.actions) {
                options.actions.split(' ').forEach(function(v, i) {
                    var action = v.split('@');

                    context.actions.push({
                        url: action[1],
                        name: action[0].toCamelCase()
                    })
                });
            }

            var result = template(context);
            var filePath = path.join('app', 'src', 'controllers', name.toCamelCase().toUpperCaseFirstChar() + 'Controller.ts');

            writeFile(filePath, result);
        },

        /**
         * Generate table
         *
         * usage: alliance create table users
         */
        table: function() {
            var templateTable = handlebars.compile(fs.readFileSync(path.join(templatesPath, 'schema.hbs')).toString()),
                templateDAO = handlebars.compile(fs.readFileSync(path.join(templatesPath, 'dao.hbs')).toString()),

                context = {
                    name: name.toCamelCase().toUpperCaseFirstChar(),
                    nameOriginal: name,
                    nameCamelCase: name.toCamelCase()
                };

            var resultTable = templateTable(context),
                resultModel = templateDAO(context),

                modelsPath = path.join('app', 'src', 'models');

            writeFile(path.join(modelsPath, 'DAO', name.toCamelCase().toUpperCaseFirstChar() + 'DAO.ts'), resultModel);
            writeFile(path.join(modelsPath, 'tables', name.toCamelCase().toUpperCaseFirstChar() + 'Table.ts'), resultTable);
        },

        /**
         * Generate migration
         *
         * usage: alliance create migration users
         */
        migration: function() {
            var date = new Date(),
                id = date.getFullYear().toString() +
                     date.getMonth().toString() +
                     date.getDate().toString() +
                     date.getHours().toString() +
                     date.getMinutes().toString() +
                     date.getSeconds().toString() +
                     date.getMilliseconds().toString(),

                template = handlebars.compile(fs.readFileSync(path.join(templatesPath, 'migration.hbs')).toString()),

                context = {
                    name: name.toCamelCase().toUpperCaseFirstChar()
                };

            var result = template(context);
            var filePath = path.join('app', 'src', 'models', 'migrations', id + '_' + name.toCamelCase().toUpperCaseFirstChar() + 'Migration.ts');

            writeFile(filePath, result);
        },

        /**
         * Generate shell
         *
         * usage: alliance create shell parser --commands "sync parse"
         */
        migration: function() {

        }
    };

    methods[method]();
};
