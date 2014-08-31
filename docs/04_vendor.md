# Vendors

Vendor folder is used to set up 3rd party scripts. We use this mostly to setup Marionette and Handlebars and to load jquery plugins.

```javascript
define(function (require) {
    'use strict';

    var Handlebars = require('handlebars');
    var Marionette = require('marionette');

    return function () {
        /**
         * Handlebars setup
         */
        Marionette.Renderer.render = function (source, context) {
            var template = Handlebars.compile(source);
            return template(context);
        };
        /**
         * Base helpers
         */
        Handlebars.registerHelper('staticFile', function (file) {
            return window.application.paths.staticFiles + file;
        });

    };
});
```



## Creating a new vendor
-------------

To scaffold out a new vendor simply open your console and type

```
yo generator-marionette-frontend:vendor
```

The vendor will be created in the folder frontend/app/vendors
