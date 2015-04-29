<% if (filters.appFrame) { %>
'use strict';

/**
 * @ngdoc function
 * @name <%= scriptAppName %>.controller:SidebarCtrl
 * @description
 * # SidebarCtrl
 * Controller of the <%= scriptAppName %>
 */
angular.module('<%= scriptAppName %>')
  .controller('SidebarCtrl', function ($scope) {

    // Definition for Navbar
    $scope.routes = [
      { name: 'MAIN PAGE', route: 'main'},
      // Hook for route scope injection
    ];

    // Definition for Sidebar
    $scope.sidebar = {
      options: true,
      key: true,
      present: false,
      info: true,
      calculations: true
    };

  });
<% } %>