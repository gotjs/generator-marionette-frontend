var require = {
    paths: {
        'jquery': '../bower_components/jquery/dist/jquery',
        'underscore': '../bower_components/underscore/underscore',
        'backbone': '../bower_components/backbone/backbone',
        'marionette': '../bower_components/backbone.marionette/lib/core/amd/backbone.marionette',
        'backbone.babysitter': '../bower_components/backbone.babysitter/lib/backbone.babysitter',
        'backbone.wreqr': '../bower_components/backbone.wreqr/lib/backbone.wreqr',
        'text': '../bower_components/requirejs-text/text',
        'handlebars' : '../bower_components/handlebars/handlebars',
        'when' : '../bower_components/when/'

    },
    shim: {
        'handlebars' : {
            exports: 'Handlebars'
        }
    }
};