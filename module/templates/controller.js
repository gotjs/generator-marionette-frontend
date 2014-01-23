define(function (require) {
    'use strict';

    var app = require('app');

    var controller = {
        index : function () {

            app.addInitializer(function () {
                console.log('Application initialized');
            });
            console.log('At the index of the module <%= module %>');

        }
    };

    return controller;
});