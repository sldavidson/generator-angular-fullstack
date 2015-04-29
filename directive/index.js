'use strict';
var yeoman = require('yeoman-generator');

var Generator = yeoman.generators.Base.extend({
  compose: function() {
  	console.log(this.arguments);
    this.composeWith('ng-component:directive', {arguments: this.arguments}, { local: require.resolve('generator-ng-component/directive') });
  }
});

module.exports = Generator;