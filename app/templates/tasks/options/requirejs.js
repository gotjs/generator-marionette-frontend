module.exports = {
    production: {
        options: {
            out                    : '<%- target %>/static_files/javascript/build.min.js',
            name                   : '../bower_components/requirejs/require',
            include                : 'bootstrap',
            mainConfigFile         : './app/settings.js',
            preserveLicenseComments: false,
            generateSourceMaps     : true,
            optimize               : 'uglify2'
        }
    }
};