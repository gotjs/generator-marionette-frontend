define(function (require) {
    'use strict';

    var Backbone = require('backbone');
    var Marionette = require('marionette');
    var entities = require('entities');

    /**
     * Will be initialized after the plugins are loaded
     * @type {SimpleLogger|Logger|*}
     */
    var logger;

    /**
     * @type {Marionette.Application}
     */
    var app = new Marionette.Application();

    app.addRegions({
        'header' : '#header',
        'container' : '#container'
    });

    /**
     * Plugins auto-loaded, we have access to Lumberman
     */
    app.on('plugins:loaded', function () {
        logger = app.lumberman.getLogger('application');
    });

    /**
     * Modules auto-loaded, we should bootstrap our application and start the modules
     */
    app.on('modules:loaded', function () {
        entities
            .getBootstrapData()
            .then(
                function (data) {
                    app.options = window.application;
                    app.bootstrap = data;
                    app.start(app.options);

                }
            )
            .catch(function (error) {
                logger.exception(error);
            });
    });

    /**
     * After bootstrapping is done and all modules are started we should start the routers
     */
    app.on('initialize:after', function (options) {
        if (!Backbone.history.start({ pushState : options.pushState })) {
            Backbone.history.navigate('home', { trigger : true });
        }
    });

    return app;
});






