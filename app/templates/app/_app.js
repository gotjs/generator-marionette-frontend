define(function (require) {
	'use strict';

    var Backbone = require('backbone');
	var Marionette = require('marionette');
    /**
     * @type {Marionette.Application}
     */
	var app = new Marionette.Application();

    app.addRegions({ 'container' : '#container' });

    app.on('initialize:after', function () {
        if (!Backbone.history.start()) {
            app.execute('navigate:home');
        }
    });

    return app;
});






