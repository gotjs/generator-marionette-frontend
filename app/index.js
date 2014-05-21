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

    this.mkdir('frontend');
    this.mkdir('frontend/app');
    this.mkdir('frontend/app/components');
    this.mkdir('frontend/app/autoload');

    this.copy('frontend/app/_app.js', 'frontend/app/app.js');
    this.copy('frontend/app/_bootstrap.js', 'frontend/app/bootstrap.js');
    this.copy('frontend/app/_vendors.js', 'frontend/app/vendors.js');
    this.copy('frontend/app/_configuration.js', 'frontend/app/configuration.js');
    this.copy('frontend/app/_entities.js', 'frontend/app/entities.js');

    this.copy('frontend/_bower.json', 'frontend/bower.json');

};

MarionetteFrontendGenerator.prototype.projectFiles = function projectFiles() {

    this.copy('_package.json', 'package.json');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
    this.copy('bowerrc', '.bowerrc');


};

MarionetteFrontendGenerator.prototype.testing = function projectFiles() {

    this.copy('_karma.conf.js', 'karma.conf.js');
    this.directory('test', 'test');

};

MarionetteFrontendGenerator.prototype.grunt = function projectFiles() {

    this.copy('_Gruntfile.js', 'Gruntfile.js');
    this.directory('build/tasks', 'build/tasks');

};

MarionetteFrontendGenerator.prototype.config = function config() {

    this.template('build/config/config.json', 'build/config/config.json');
    this.copy('build/config/development.json', 'build/config/development.json');
    this.copy('build/config/production.json', 'build/config/production.json');

};

MarionetteFrontendGenerator.prototype.templates = function templates() {

    this.copy('build/index.html', 'build/index.html');
    this.copy('build/requirejs.json', 'build/requirejs.json');
    this.copy('build/test-main.js', 'build/test-main.js');

};

MarionetteFrontendGenerator.prototype.plugins = function plugins() {

    var cb = this.async();

    this.mkdir('frontend/app/plugins');
    this.invoke('marionette-frontend:plugin', { options: { plugin : 'navigate', predefined : true, autoload : false }}, function () {
        this.invoke('marionette-frontend:plugin', { options: { plugin : 'logger', predefined : true, autoload : true }}, cb);
    }.bind(this));

};

MarionetteFrontendGenerator.prototype.modules = function plugins() {

    var cb = this.async();

    this.mkdir('frontend/app/modules');
    this.invoke('marionette-frontend:module', { options: { module : 'home', autoload : true }}, cb);

};

MarionetteFrontendGenerator.prototype.staticFiles = function staticFiles() {

    this.mkdir('frontend/static_files');
    this.copy('frontend/static_files/favicon.ico', 'frontend/static_files/favicon.ico');

};

