# Plugins

Plugins extend the application. We use plugins to add new functionality to the application, e.g. communicate with a backend API:

```javascript
define(function (require) {
    'use strict';

    var when = require('when/when');
    var Backbone = require('backbone');

    return function (app) {
    
        app.api = function(url, data) {

            var deferred = when.defer();
            $
                .ajax(url, { data : data})
                .done(function(result) {
                    deferred.resolve(result.data);
                })
                .fail(function(data) {
                    deferred.reject(data);
                });
                
    
            return deferred.promise;
        }
       
       
    };
});
```



## Creating a new plugin
-------------

To scaffold out a new plugin simply open your console and type

```
yo generator-marionette:plugin
```

The plugin will be created in the folder frontend/app/plugins