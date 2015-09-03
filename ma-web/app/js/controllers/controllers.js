'use strict';
/*global ol, source */

var controllerModule = angular.module('ma-app.controllers', [
	'ngMaterial'
]).
controller('MainCtrl', function($scope, $mdSidenav, $mdDialog) {
	$scope.LoginDialog = function($event) {

		$mdDialog.show({
			targetEvent: $event,
			templateUrl: '../partials/login.html',
			controller: LoginCtrl
		});

		function LoginCtrl($scope) {}
	};
}).
controller('ImgCtrl', function($scope) {
	$scope.ComName = 'img/crotec.svg';
	$scope.nameimg = '../img/banner.jpg';
}).
controller('BackgroundCtrl', function($scope) {
	$scope.topDirections = ['left'];
	$scope.bottomDirections = ['down'];
	$scope.isOpen = false;
	$scope.selectedMode = 'md-fling';
	$scope.selectedDirection = 'up';

}).
controller('MapCtrl', function($scope, $window, layerService, geometryService, vectorService) {

	var draw, geometryFunction, maxPoints;

	$scope.geomCategories = geometryService.getGeometryCategories();
	$scope.vector = vectorService.addVector();
	$scope.mapSource = vectorService.addSource();

	var mapViewer = layerService.init();
	mapViewer.addLayer($scope.vector);

	$scope.addInteraction = function(geomId) {

		//	$scope.removeInteraction();
		draw = new ol.interaction.Draw({
			source: $scope.mapSource,
			type: geomId,
			geometryFunction: geometryFunction,
			maxPoints: maxPoints
		});
		mapViewer.addInteraction(draw);
	}

	// $scope.removeInteraction = function() {
	// 	if (draw != null) {
	// 		mapViewer.removeInteraction(draw);
	// 	}
	// }
	//});

});