'use strict';

angular.module('<%= scriptAppName %>')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/main',
        templateUrl: 'main/main.html',
        controller: 'MainCtrl'
      });
  });