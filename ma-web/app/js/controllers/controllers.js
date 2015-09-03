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

	$scope.geomCategories = geometryService.getGeometryCategories();

	var vector = vectorService.addVector();
	var mapSource = vectorService.addSource();
	var mapViewer = layerService.init();

	mapViewer.addLayer(vector);

	var draw, geometryFunction;

	$scope.addInteraction = function(geomId) {
    if (geomId === 'Square') {
      geomId= 'Circle';
      geometryFunction = ol.interaction.Draw.createRegularPolygon(4);
    }




		$scope.removeInteraction();
		draw = new ol.interaction.Draw({
			source: mapSource,
			type: geomId,
			geometryFunction: geometryFunction,
		});
		mapViewer.addInteraction(draw);
	}

	$scope.removeInteraction = function() {
		if (draw != null) {
			mapViewer.removeInteraction(draw);
		}
	};
});