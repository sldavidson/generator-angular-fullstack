'use strict';

/**
 * @ngdoc overview
 * @name <%= scriptAppName %>
 * @description
 * # <%= scriptAppName %>
 *
 * Main module of the application.
 */
angular
.module('<%= scriptAppName %>', [<%= angularModules %>])<% if (!filters.uirouter && !filters.siteCatalyst) { %>;
<% } else if (filters.uirouter && !filters.siteCatalyst) { %>
.config(function ($urlRouterProvider) {
  // For any unmatched url, redirect to /main
  $urlRouterProvider.otherwise('/main');
});
<% } else if (filters.uirouter && filters.siteCatalyst) { %>
.config(function ($urlRouterProvider, $analyticsProvider) {
  // For any unmatched url, redirect to /main
  $urlRouterProvider.otherwise('/main');
  $analyticsProvider.developerMode(true); // if uncommented tracking is disabled.
})
<% } else  if (!filters.uirouter && filters.siteCatalyst) { %>
.config(function ($analyticsProvider) {
  $analyticsProvider.developerMode(true); // if uncommented tracking is disabled.
})
<% } %> <% if (filters.siteCatalyst) { %>
.run(function ($analytics) {
  angulartics.waitForVendorApi('dtm_track', 30, function() {
    $analytics.setUserProperties('<%= scriptAppName %>', '<%= scriptAppName %>', '1.0.1');
    $analytics.pageTrack('/main'); //track the initial load as the assests aren't initally ready.
  });
});
<% } %>
