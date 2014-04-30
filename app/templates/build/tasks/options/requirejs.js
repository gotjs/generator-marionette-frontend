module.exports = {
    production: {
        options: {
            out                    : 'build/dist/javascript/build.min.js',
            name                   : '../bower_components/requirejs/require',
            include                : 'bootstrap',
            mainConfigFile         : './app/settings.js',
            preserveLicenseComments: false,
            generateSourceMaps     : true,
            optimize               : 'uglify2'
        }
    }
};