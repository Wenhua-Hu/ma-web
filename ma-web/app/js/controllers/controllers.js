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
	var features = vector.getSource().getFeaturesCollection();
	var mapSource = vectorService.addSource();
	var mapViewer = layerService.init();

	mapViewer.addLayer(vector);

	var draw, modify;

	$scope.addInteraction = function(geomId) {
		var geometryFunction, maxPoints;
		$scope.removeInteraction();

		if (geomId === 'Square') {
			geomId = 'Circle';
			geometryFunction = ol.interaction.Draw.createRegularPolygon(6);
		} else if (geomId === 'Box') {
			geomId = 'Circle';
			//maxPoints = 5;

			geometryFunction = function(coordinates, geometry) {

				if (!geometry) {
					geometry = new ol.geom.Polygon(null);
				}
				var start = coordinates[0];
				//console.log(start);
				var end = coordinates[1];


				var a = geometry.setCoordinates([
					[start, [start[0], end[1]], end, [end[0], start[1]], start]
				]);
				//console.log(geometry);
				return geometry;
			};
		}

		draw = new ol.interaction.Draw({
			features: features,
			source: mapSource,
			type: geomId,
			geometryFunction: geometryFunction
		});

		modify = new ol.interaction.Modify({
			features: features,
		});

		var snap = new ol.interaction.Snap({
			source: vector.getSource()
		});
		
		mapViewer.addInteraction(draw);
		mapViewer.addInteraction(snap);
		//this part will be stricted by controller, 
		//it will be changed following the next development(move outsides)
		mapViewer.addInteraction(modify);
	};

	$scope.removeInteraction = function() {
		if (draw !== null) {
			mapViewer.removeInteraction(draw);
		}
	};
});