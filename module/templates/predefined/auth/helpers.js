define(function (require) {
    'use strict';

    var _ = require('underscore');
    var Handlebars = require('handlebars');

    var helpers = {
        lorem : function () {
            return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae porttitor magna. Mauris erat erat, feugiat vitae dui quis, aliquet aliquam metus. Nam in neque dui. Sed dictum dolor non est ornare, vel imperdiet purus lobortis. Suspendisse tortor est, sagittis in dignissim nec, mollis ut magna. Vivamus sapien diam, porta eget dolor at, tincidunt laoreet nunc. Morbi nec massa a mi congue mattis sed nec massa. Morbi quis tellus est. In rutrum egestas risus, id malesuada purus sodales sed. Fusce at nibh purus. Pellentesque sagittis dui sit amet sagittis lobortis. Nulla lacinia ultrices leo, tempor tempus est congue eu. Praesent arcu sem, elementum a urna suscipit, facilisis euismod massa. Donec quis tempus ante.';
        }
    };

    _.each(helpers, function (func, name) {
        Handlebars.registerHelper(name, func);
    });

    return helpers;
});
