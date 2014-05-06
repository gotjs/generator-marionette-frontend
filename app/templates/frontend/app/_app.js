define(function (require) {
    'use strict';

    var Backbone = require('backbone');
    var Marionette = require('marionette');
    var when = require('when/when');

    var entities = require('entities');

    /**
     * @type {Marionette.Application}
     */
    var app = new Marionette.Application();

    app.addRegions({ 'container' : '#container' });

    app.reqres.setHandler('bootstrap', function () {

        var defer = when.defer();

        entities
            .getBootstrapData()
            .then(
            function (data) {
                app.bootstrap = data;
                defer.resolve(data);
            },
            defer.reject
        );

        return defer.promise;
    });

    app.on('initialize:after', function (options) {

        app
            .request('bootstrap')
            .then(
                function () {
                    if (!Backbone.history.start({ pushState : options.pushState })) {
                        Backbone.history.navigate('home', { trigger : true });
                    }
                }
            )
            .catch(console.error);

    });

    return app;
});






