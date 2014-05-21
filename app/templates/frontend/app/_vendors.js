define(function (require) {
    'use strict';

    var app = require('app');

    /**
     * Generally used for jquery extensions that should be available globally
     */

    app.trigger('vendors:loaded');

});
