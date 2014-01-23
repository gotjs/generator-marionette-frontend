define(function (require) {
    'use strict';

    var Backbone = require('backbone');

    return function (app) {
        app.navigate = function (route, options) {
            Backbone.history.navigate(route, options);
        };
    };
});






