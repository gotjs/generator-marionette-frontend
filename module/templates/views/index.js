define(function (require) {
    'use strict';

    var Marionette = require('marionette');
    return Marionette.ItemView.extend({
        serializeData : function () {
            return {
                'message' : this.options.message
            };
        }
    });

});