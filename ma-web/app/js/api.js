'use strict';

angular.module('ma-app.api', []).

factory('apiDiscovery', function() {
  return {
    request: function() {
      // XXX Use local development URL for now.
      return 'http://localhost:3030';
    }
  };
}).
factory('apiUrl', function(apiDiscovery) {
  return {
    root: apiDiscovery.request() + '/',
  };
});
