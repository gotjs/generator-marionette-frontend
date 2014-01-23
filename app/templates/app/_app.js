define(function (require) {
	'use strict';

    var Backbone = require('backbone');
	var Marionette = require('marionette');
    /**
     * @type {Marionette.Application}
     */
	var app = new Marionette.Application();

    app.on('initialize:after', function () {
        Backbone.history.start();
    });

    return app;
});






