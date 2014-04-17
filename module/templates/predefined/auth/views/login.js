define(function (require) {
    'use strict';

    var Marionette = require('marionette');
    return Marionette.ItemView.extend({
        ui : {
            'username' : '.js-username',
            'password' : '.js-password',
            'submit' : '.js-submit'
        },
        events : {
            'click @ui.submit' : 'submit',
            'submit' : 'submit'
        },
        submit : function () {
            this.triggerMethod('submit', this.ui.username.val(), this.ui.password.val());
            return false;
        }
    });

});