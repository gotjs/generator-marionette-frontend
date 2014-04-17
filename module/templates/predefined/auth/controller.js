define(function (require) {
    'use strict';

    var app = require('app');
    var IndexView = require('./views/login');

    var controller = {
        login : function () {
            var view = new IndexView({
                template : require('text!./templates/login.hbs')
            });
            view.on('submit', function (username, password) {
                if (username == 'admin' && password == '12345') {
                    localStorage.setItem('authorized', true);
                    app
                        .request('bootstrap')
                        .then(function () {
                            app.execute('navigate:home');
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