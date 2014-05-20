# Testing

## Running your tests
```
grunt test
```

## Writing your tests

We use [jasmine](http://jasmine.github.io/2.0/introduction.html) to write our tests. Requirejs is used to handle dependencies. Simply load in the item you're testing and write your test.

**All tests should end with the filename "Spec.js", for example "appSpec.js"**
```javascript
    define(function (require) {
        'use strict';

        var app = require('app');
        var Marionette = require('marionette');

        describe('app', function () {

            it('is an instance of marionette.application', function () {
                expect(app instanceof Marionette.Application).toBe(true);
            });

        });

    });
```