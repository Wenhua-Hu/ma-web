'use strict';

/**
 * @ngdoc overview
 * @name ma-app
 *
 * @description
 * This `ma-app` module is the main module of the app.
 */
var appModule = angular.module('ma-app', [
  'ngAnimate',
  'ngMaterial',
  'ngResource',
  'ngRoute',
  'ngDialog',
  'ui.bootstrap',
  'ma-app.api',
  'ma-app.controllers',
  'ma-app.directives',
  'ma-app.filters',
  'ma-app.services',
  'ma-app.settings'

]);
appModule.config(function($routeProvider) {
  $routeProvider.
  when('/map', {
    templateUrl: 'partials/map.html',
    controller: 'MapCtrl'
  }).
  otherwise({
    redirectTo: '/map'
  });
});
