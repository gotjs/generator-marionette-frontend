'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs');
var os = require('os');
var yeoman = require('yeoman-generator');

var ModuleGenerator = module.exports = function ModuleGenerator(args, options, config) {

    yeoman.generators.Base.apply(this, arguments);

    this.predefined = options.predefined;
    this.module = options.module;
    this.autoload = options.autoload;

};

util.inherits(ModuleGenerator, yeoman.generators.Base);

ModuleGenerator.prototype.askFor = function askFor() {

    if (!this.module) {
        var cb = this.async();

        var prompts = [
            {
                name: 'module',
                message: 'What do you want to call your module?'
            },
            {
                type: 'confirm',
                name: 'autoload',
                message: 'Would you like to generate the module autoloader file?',
                default: true
            }
        ];

        this.prompt(prompts, function (props) {

            this.module = props.module;
            this.autoload = props.autoload;

            cb();
        }.bind(this));
    }

};

ModuleGenerator.prototype.generateModule = function generateModule() {

    if (!this.predefined) {
        this.mkdir('app/modules/' + this.module);

        this.template('module.js', 'app/modules/' + this.module + '/' + this.module + 'Module.js');
        this.copy('controller.js', 'app/modules/' + this.module + '/controller.js');
        this.copy('helpers.js', 'app/modules/' + this.module + '/helpers.js');
        this.copy('entities.js', 'app/modules/' + this.module + '/entities.js');

        this.mkdir('app/modules/' + this.module + '/templates');
        this.copy('templates/index.hbs', 'app/modules/' + this.module + '/templates/index.hbs');

        this.mkdir('app/modules/' + this.module + '/views');
        this.copy('views/index.js', 'app/modules/' + this.module + '/views/index.js');
    }
    else {
        console.log(this.module, 'predefined/' + this.module, 'app/modules/' + this.module);
        this.directory('predefined/' + this.module, 'app/modules/' + this.module);
    }



};


ModuleGenerator.prototype.generateAutoloader = function generateAutoloader() {

    if (this.autoload) {

        var start = this.readFileAsString(path.join(__dirname, 'templates', 'autoload', 'start.js'));
        var end = this.readFileAsString(path.join(__dirname, 'templates', 'autoload', 'end.js'));
        var files = fs.readdirSync(path.join(process.cwd(), 'app', 'modules')).map(function (dirName) {
            return '    require(\'modules/' + dirName + '/' + dirName + 'Module\');';
        });
        var autoloader = start + files.join(os.EOL) + end;

        this.write('app/autoload/modules.js', autoloader);
    }

};

