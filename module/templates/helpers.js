define(function (require) {
    'use strict';

    var _ = require('underscore');
    var Handlebars = require('handlebars');

    var helpers = {
    };

    _.each(helpers, function (func, name) {
        Handlebars.registerHelper(name, func);
    });

    return helpers;
});
