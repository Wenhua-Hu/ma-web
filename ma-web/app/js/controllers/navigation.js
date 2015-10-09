'use strict';
angular.module('ma-app.navigation', [
	'ngMaterial',
	'ui.bootstrap',
	'ngDialog'
]).
controller('navCtrl', function($scope, $rootScope, $timeout, layerService) {
	//alert();
	$scope.service = layerService;


	$scope.Features = layerService.SelectedFeatures();



	$rootScope.$on('updateFeatures', function(event, data) {
		console.log("123");
		$scope.Features = data;
		$scope.$apply();
	});




});