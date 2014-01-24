define(function (require) {
    'use strict';

    var app = require('app');

    var Marionette = require('marionette');

    var entities = require('./entities');
    var helpers = require('./helpers');
    var controller = require('./controller');

    /**
     * Routers
     */
    var Router = Marionette.AppRouter.extend({

        appRoutes: {
            '<%- module %>' : 'index'
        },
        controller : {
            index : function () {
                app.execute('navigate:<%- module %>');
            }
        }
    });

    /**
     * Commands
     */
    app.commands.setHandler('navigate:<%- module %>', function () {
        controller.index();
        app.navigate('<%- module %>');
    });

    return {
        entities: entities,
        controllers: controller,
        router: new Router(),
        helpers : helpers
    };
});