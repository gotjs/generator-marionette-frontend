define(function (require) {
    'use strict';

    var Backbone = require('backbone');

    var app = require('app');
    var IndexView = require('./views/login');

    var controller = {
        login : function (path) {

            var view = new IndexView({
                template : require('text!./templates/login.hbs')
            });
            view.on('submit', function (username, password) {
                if (username == 'admin' && password == '12345') {
                    localStorage.setItem('authorized', true);
                    app
                        .request('bootstrap')
                        .then(function () {
                            Backbone.history.navigate(path, { trigger : true });
                        },
                        app.logger.error
                    );
                }
                else {
                    alert('Wrong password');
                }
            });
            app.container.show(view);
        }
    };

    return controller;
});