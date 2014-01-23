define(function (require) {
    'use strict';

    var Handlebars = require('handlebars');
    var Marionette = require('marionette');

    /**
     * Handlebars setup
     * TODO: Move this somewhere
     */
    Marionette.Renderer.render = function (source, context) {
        try {
            var template = Handlebars.compile(source);
            return template(context);
        }
        catch (e) {
            window.console.error('Error occurred while trying to evaluate a template', source, context);
            throw e;
        }
    };

});

