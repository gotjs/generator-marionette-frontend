define(function (require) {
    'use strict';

    var Handlebars = require('handlebars');
    var Marionette = require('marionette');

    /**
     * Handlebars setup
     * TODO: Move this somewhere
     */
    Marionette.Renderer.render = function (source, context) {
        var template = Handlebars.compile(source);
        return template(context);
    };

});

