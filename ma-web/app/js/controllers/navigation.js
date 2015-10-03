'use strict';
angular.module('ma-app.navigation', [
	'ngMaterial',
	'ui.bootstrap',
	'ngDialog'
]).
controller('navCtrl', function($scope, $rootScope, layerService) {
	//alert();
	$scope.service = layerService;
	// $scope.len = -1;
	// $scope.layersInfo=layerService.LayerInfo();
	// //$scope.features = layerService.SelectedFeatures;
	
	// $scope.getA = function() {
	// 	$scope.a = service.length;
	// 	$scope.len = $scope.a;
			
	// };



});