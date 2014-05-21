define(function (require) {
    'use strict';

    var when = require('when/when');

    var API = {
        getBootstrapData : function() {

            var deferred = when.defer();
            deferred.resolve({
                'id' : 1
            });
            return deferred.promise;
        }

    };

    return API;


});