'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var OpusGenerator = module.exports = function OpusGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

};
util.inherits(OpusGenerator, yeoman.generators.Base);

OpusGenerator.prototype.askFor = function askFor() {
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

OpusGenerator.prototype.app = function app() {

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

OpusGenerator.prototype.projectFiles = function projectFiles() {

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('jshintrc', '.jshintrc');

};

OpusGenerator.prototype.grunt = function projectFiles() {
    this.copy('_Gruntfile.js', 'Gruntfile.js');
    this.directory('tasks', 'tasks');

};

OpusGenerator.prototype.config = function config() {

    this.mkdir('config');
    this.template('config/config.json', 'config/config.json');
    this.copy('config/environment.json', 'config/environment.json');
    this.copy('config/staging.json', 'config/staging.json');

};

OpusGenerator.prototype.templates = function templates() {

    this.mkdir('templates');
    this.copy('templates/index.html.tmpl', 'templates/index.html.tmpl');

};

OpusGenerator.prototype.plugins = function plugins() {

    var cb = this.async();

    this.mkdir('app/plugins');
    this.invoke('opus:plugin', { options: { plugin : 'logger', predefined: true, autoload : false }}, function () {
        this.invoke('opus:plugin', { options: { plugin : 'navigate', predefined : true, autoload : true }}, cb);
    }.bind(this));
};

OpusGenerator.prototype.modules = function plugins() {

    var cb = this.async();

    this.mkdir('app/modules');

    this.invoke('opus:module', { options: { module : 'home', autoload : true}}, function () {
        this.invoke('opus:module', { options: { module : 'auth', predefined : true, autoload : true }}, cb);
    }.bind(this));
};



OpusGenerator.prototype.staticFiles = function staticFiles() {

    this.mkdir('static_files');
    this.mkdir('static_files/img');

    this.copy('static_files/favicon.ico', 'static_files/favicon.ico');
    this.copy('static_files/img/styles.css', 'static_files/img/styles.css');

};

