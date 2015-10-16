'use strict';
angular.module('ma-app.navigation', [
	'ngMaterial',
	'ui.bootstrap',
	'ngDialog',
	'angularResizable'
]).
controller('navCtrl', function($scope, $rootScope, layerService) {
	// var placeOverlay = new ol.Overlay({
	//   element: document.getElementById('placeOverlay'),
	//    offset:[0,2],
	//    positioning:'bottom-center'
	// });
	// layerService.map().addOverlay(placeOverlay);
	// layerService.map().getOverlays().item(1);

	$scope.Features = layerService.SelectedFeatures();
	$scope.Addresses = layerService.addresses();
	$scope.selectedIndex = 0;



	$scope.$on('updateFeatures', function(event, data) {
		$scope.Features = data;
		$scope.selectedIndex=0;
		$scope.$apply();
	});
	$scope.$on('updateAddresses', function(event, data) {
		$scope.Addresses = data;
		$scope.selectedIndex=1;



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
		layerService.map().getOverlays().item(1).setPosition([coord[0], coord[1]]);
		$scope.selectedIndex=1;

	};
});