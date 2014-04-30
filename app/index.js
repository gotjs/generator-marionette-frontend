'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var MarionetteFrontendGenerator = module.exports = function MarionetteFrontendGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

};
util.inherits(MarionetteFrontendGenerator, yeoman.generators.Base);

MarionetteFrontendGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [
        {
            name: 'applicationName',
            message: 'What do you want to call your application?'
        }
    ];

    this.prompt(prompts, function (props) {
        this.applicationName = props.applicationName;
        cb();
    }.bind(this));
};

MarionetteFrontendGenerator.prototype.app = function app() {

    this.mkdir('app');
    this.mkdir('app/components');
    this.mkdir('app/utils');
    this.mkdir('app/autoload');

    this.copy('app/_app.js', 'app/app.js');
    this.copy('app/_bootstrap.js', 'app/bootstrap.js');
    this.copy('app/_vendors.js', 'app/vendors.js');
    this.copy('app/_configuration.js', 'app/configuration.js');
    this.copy('app/_settings.js', 'app/settings.js');
    this.copy('app/_entities.js', 'app/entities.js');

};

MarionetteFrontendGenerator.prototype.projectFiles = function projectFiles() {

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');

};

MarionetteFrontendGenerator.prototype.grunt = function projectFiles() {

    this.copy('_Gruntfile.js', 'Gruntfile.js');
    this.mkdir('build');
    this.directory('build/tasks', 'build/tasks');

};

MarionetteFrontendGenerator.prototype.config = function config() {

    this.mkdir('build/config');
    this.template('build/config/config.json', 'build/config/config.json');
    this.copy('build/config/development.json', 'build/config/development.json');
    this.copy('build/config/production.json', 'build/config/production.json');

};

MarionetteFrontendGenerator.prototype.templates = function templates() {

    this.copy('build/index.html', 'build/index.html');

};

MarionetteFrontendGenerator.prototype.plugins = function plugins() {

    var cb = this.async();

    this.mkdir('app/plugins');
    this.invoke('marionette-frontend:plugin', { options: { plugin : 'logger', predefined: true, autoload : false }}, function () {
        this.invoke('marionette-frontend:plugin', { options: { plugin : 'navigate', predefined : true, autoload : true }}, cb);
    }.bind(this));
};

MarionetteFrontendGenerator.prototype.modules = function plugins() {

    var cb = this.async();

    this.mkdir('app/modules');

    this.invoke('marionette-frontend:module', { options: { module : 'home', autoload : false }}, function () {
        this.invoke('marionette-frontend:module', { options: { module : 'auth', predefined : true, autoload : true }}, cb);
    }.bind(this));
};



MarionetteFrontendGenerator.prototype.staticFiles = function staticFiles() {

    this.mkdir('static_files');
    this.copy('static_files/favicon.ico', 'static_files/favicon.ico');

};

