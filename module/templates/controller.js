define(function (require) {
    'use strict';

    var app = require('app');
    var IndexView = require('./views/index');

    var controller = {
        index : function () {
            var view = new IndexView({
                template : require('text!./templates/index.hbs'),
                message : 'Welcome to the module <%- module %>'
            });
            app.container.show(view);
        }
    };

    return controller;
});