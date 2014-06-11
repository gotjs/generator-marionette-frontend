'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs');
var os = require('os');
var yeoman = require('yeoman-generator');

var VendorGenerator = module.exports = function VendorGenerator(args, options, config) {

    yeoman.generators.Base.apply(this, arguments);

    this.predefined = options.predefined;
    this.vendor = options.vendor;
    this.autoload = (options.autoload === undefined ? true : options.autoload);

};
util.inherits(VendorGenerator, yeoman.generators.Base);

VendorGenerator.prototype.askFor = function askFor() {

    if (!this.vendor) {
        var cb = this.async();

        var prompts = [
            {
                name: 'vendor',
                message: 'What do you want to call your vendor file?'
            }
        ];

        this.prompt(prompts, function (props) {
            this.vendor = props.vendor;
            cb();
        }.bind(this));

    }
};

VendorGenerator.prototype.generateVendor = function generateVendor() {
    if (!this.predefined) {
        this.template('default.js', 'frontend/app/vendors/' + this.vendor + '.js');
    }
    else {
        this.copy('predefined/' + this.vendor + '.js', 'frontend/app/vendors/' + this.vendor + '.js');
    }

};


VendorGenerator.prototype.generateAutoloader = function generateAutoloader() {

    if (this.autoload) {

        var start = this.readFileAsString(path.join(__dirname, 'templates', 'autoload', 'start.js'));
        var end = this.readFileAsString(path.join(__dirname, 'templates', 'autoload', 'end.js'));
        var files = fs.readdirSync(path.join(process.cwd(), 'frontend', 'app', 'vendors')).map(function (filename) {
            return '        require(\'vendors/' + path.basename(filename, '.js') + '\')(app);';
        });
        var autoloader = start + files.join(os.EOL) + end;

        this.write('frontend/app/autoload/vendors.js', autoloader);
    }

};

