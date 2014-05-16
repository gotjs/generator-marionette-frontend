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
    this.autoload = (options.autoload === undefined ? true : options.autoload);

};

util.inherits(ModuleGenerator, yeoman.generators.Base);

ModuleGenerator.prototype.askFor = function askFor() {

    if (!this.module) {
        var cb = this.async();

        var prompts = [
            {
                name: 'module',
                message: 'What do you want to call your module?'
            }
        ];

        this.prompt(prompts, function (props) {

            this.module = props.module;

            cb();
        }.bind(this));
    }

};

ModuleGenerator.prototype.generateModule = function generateModule() {

    if (!this.predefined) {
        this.mkdir('frontend/app/modules/' + this.module);

        this.template('module.js', 'frontend/app/modules/' + this.module + '/' + this.module + 'Module.js');
        this.copy('controller.js', 'frontend/app/modules/' + this.module + '/controller.js');
        this.copy('helpers.js', 'frontend/app/modules/' + this.module + '/helpers.js');
        this.copy('entities.js', 'frontend/app/modules/' + this.module + '/entities.js');

        this.mkdir('frontend/app/modules/' + this.module + '/templates');
        this.copy('templates/index.hbs', 'frontend/app/modules/' + this.module + '/templates/index.hbs');

        this.mkdir('frontend/app/modules/' + this.module + '/views');
        this.copy('views/index.js', 'frontend/app/modules/' + this.module + '/views/index.js');
    }
    else {
        this.directory('predefined/' + this.module, 'frontend/app/modules/' + this.module);
    }



};


ModuleGenerator.prototype.generateAutoloader = function generateAutoloader() {

    if (this.autoload) {

        var start = this.readFileAsString(path.join(__dirname, 'templates', 'autoload', 'start.js'));
        var end = this.readFileAsString(path.join(__dirname, 'templates', 'autoload', 'end.js'));
        var files = fs.readdirSync(path.join(process.cwd(), 'frontend', 'app', 'modules')).map(function (dirName) {
            return '    require(\'modules/' + dirName + '/' + dirName + 'Module\');';
        });
        var autoloader = start + files.join(os.EOL) + end;

        this.write('frontend/app/autoload/modules.js', autoloader);
    }

};

