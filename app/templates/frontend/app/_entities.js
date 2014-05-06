define(function (require) {
    'use strict';

    var when = require('when/when');

    var API = {
        getBootstrapData : function() {

            var deferred = when.defer();
            deferred.resolve({
                authorized : localStorage.getItem('authorized') === 'true'
            });
            return deferred.promise;
        }

    };

    return API;


});