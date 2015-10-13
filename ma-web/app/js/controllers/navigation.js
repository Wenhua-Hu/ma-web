'use strict';
angular.module('ma-app.navigation', [
	'ngMaterial',
	'ui.bootstrap',
	'ngDialog',
	'angularResizable'
]).
controller('navCtrl', function($scope, $rootScope, layerService) {

	$scope.Features = layerService.SelectedFeatures();
	 $scope.Addresses = layerService.addresses();



	$scope.$on('updateFeatures', function(event, data) {
		$scope.Features = data;
		$scope.$apply();
	});
		$scope.$on('updateAddresses', function(event, data) {
		$scope.Addresses = data;
		//console.log("data" + $scope.Addresses[0].Municipality);
		//$scope.$apply();

	});


	$scope.isOpen = true;
	$scope.toggleClass = function() {
		$scope.isOpen = $scope.isOpen === false ? true : false;
	};

	$scope.isOpenAddress = true;
	$scope.toggleAddress = function() {
		$scope.isOpenAddress = $scope.isOpenAddress === false ? true : false;
	};

		$scope.locateTo = function(coordinate) {

		var coord = coordinate.split(" ");
		layerService.map().getView().setCenter(ol.proj.transform([coord[0], coord[1]], 'EPSG:28992', 'EPSG:28992'));

	};
});