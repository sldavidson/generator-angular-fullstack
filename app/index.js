'use strict';
var fs = require('fs');
var path = require('path');
var util = require('util');
var genUtils = require('../util.js');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var wiredep = require('wiredep');

var AngularFullstackGenerator = yeoman.generators.Base.extend({

  init: function () {
    this.argument('name', { type: String, required: false });
    this.appname = this.name || path.basename(process.cwd());
    this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));

    this.option('app-suffix', {
      desc: 'Allow a custom suffix to be added to the module name',
      type: String,
      required: 'false'
    });
    this.scriptAppName = this.appname + genUtils.appName(this);
    this.appPath = this.env.options.appPath;
    this.pkg = require('../package.json');

    this.filters = {};
  },

  info: function () {
    if (!this.options['skip-welcome-message']) {
      this.log(yosay('Hello! I\'m about to hook you up with some awesome tools. All I ask for in return is that you build an awesome Domo App with it. Good Luck!'));
      this.log(chalk.magenta('Out of the box I include D3, Lodash, and AngularJS.\n'));
    }
  },

  checkForConfig: function() {
    var cb = this.async();

    if(this.config.get('filters')) {
      this.prompt([{
        type: "confirm",
        name: "skipConfig",
        message: "Existing .yo-rc configuration found, would you like to use it?",
        default: true,
      }], function (answers) {
        this.skipConfig = answers.skipConfig;
        cb();
      }.bind(this));
    } else {
      cb();
    }
  },

  clientPrompts: function() {
    if(this.skipConfig) return;
    var cb = this.async();

    this.prompt([{
        type: 'input',
        name: 'dimensions',
        message: 'What badge size would you like your app to be?',
        default: '5x3'
      }, {
        type: 'confirm',
        name: 'compass',
        message: 'Would you like to include Compass for Sass?',
        default: true
      }, {
      type: 'checkbox',
      name: 'modules',
      message: 'Which modules would you like to include?',
      choices: [
        {
          value: 'uirouter',
          name: 'UI Router',
          checked: true
        }, {
          value: 'animateModule',
          name: 'angular-animate.js',
          checked: true
        }, {
          value: 'cookiesModule',
          name: 'angular-cookies.js',
          checked: true
        }, {
          value: 'resourceModule',
          name: 'angular-resource.js',
          checked: true
        }, {
          value: 'routeModule',
          name: 'angular-ui-router.js',
          checked: true
        }, {
          value: 'sanitizeModule',
          name: 'angular-sanitize.js',
          checked: true
        }, {
          value: 'touchModule',
          name: 'angular-touch.js',
          checked: true
        }, {
          value: 'appFrame',
          name: 'da.appFrame.js',
          checked: true
        }, {
          value: 'moment',
          name: 'moment.js',
          checked: true
        }, {
          value: 'siteCatalyst',
          name: 'site catalyst',
          checked: true
        }
      ]
    }], function (answers) {
      var hasMod = function (mod) { return answers.modules.indexOf(mod) !== -1; };
      this.config.set('appSize', require('../size')(answers.dimensions || '5x3'));
      this.filters.compass =  !!answers.compass;
      this.filters.uirouter = hasMod('uirouter');
      this.filters.animateModule = hasMod('animateModule');
      this.filters.cookiesModule = hasMod('cookiesModule');
      this.filters.resourceModule = hasMod('resourceModule');
      this.filters.routeModule = hasMod('routeModule');
      this.filters.sanitizeModule = hasMod('sanitizeModule');
      this.filters.touchModule = hasMod('touchModule');
      this.filters.appFrame = hasMod('appFrame');
      this.filters.moment = hasMod('moment');
      this.filters.siteCatalyst = hasMod('siteCatalyst');

      cb();
      }.bind(this)
    );
  },

  saveSettings: function() {
    if(this.skipConfig) return;
    this.config.set('filters', this.filters);
    this.config.forceSave();
  },

  compose: function() {
    if(this.skipConfig) return;
    var appPath = 'app/';
    var filters = [];

    if(this.filters.ngroute) filters.push('ngroute');
    if(this.filters.uirouter) filters.push('uirouter');
    this.composeWith('ng-component', {
      options: {
        'routeDirectory': appPath,
        'filters': filters,
      }
    }, { local: require.resolve('generator-ng-component/app/index.js') });
  },

  ngModules: function() {
    this.filters = this.config.get('filters');

    var ngModules = [];

    if (this.filters.uirouter) { ngModules.push("'ui.router'");}
    if (this.filters.animateModule) { ngModules.push("'ngAnimate'");}
    if (this.filters.cookiesModule) { ngModules.push("'ngCookies'"); }
    if (this.filters.resourceModule) { ngModules.push("'ngResource'"); }
    if (this.filters.sanitizeModule) { ngModules.push("'ngSanitize'"); }
    if (this.filters.touchModule) { ngModules.push("'ngTouch'"); }
    if (this.filters.appFrame) { ngModules.push("'da.appFrame'"); }
    if (this.filters.moment) { ngModules.push("'angularMoment'"); }
    if (this.filters.siteCatalyst) {
      ngModules.push("'angulartics'");
      ngModules.push("'angulartics.adobe.analytics'");
    }

    this.angularModules = "\n  " + ngModules.join(",\n  ") +"\n";
  },

  generate: function() {
    this.sourceRoot(path.join(__dirname, './templates'));
    genUtils.processDirectory(this, '.', '.');
  },

  end: function() {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});

module.exports = AngularFullstackGenerator;
