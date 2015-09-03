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
controller('MapCtrl', function($scope, $window, layerService, geometryService) {
	$scope.geomCategories = geometryService.getGeometryCategories();

	var features = new ol.Collection();
	var featureOverlay = new ol.layer.Vector({
		source: new ol.source.Vector({
			features: features
		}),
		style: new ol.style.Style({
			fill: new ol.style.Fill({
				color: 'rgba(255, 255, 255, 0.2)'
			}),
			stroke: new ol.style.Stroke({
				color: '#ffcc33',
				width: 2
			}),
			image: new ol.style.Circle({
				radius: 7,
				fill: new ol.style.Fill({
					color: '#ffcc33'
				})
			})
		})
	});

	var source = new ol.source.Vector({
		wrapX: false
	});

	var vector = new ol.layer.Vector({
		source: source,

		style: new ol.style.Style({
			fill: new ol.style.Fill({
				color: 'rgba(255, 255, 255, 0.2)'
			}),
			stroke: new ol.style.Stroke({
				color: '#ffcc33',
				width: 2
			}),
			image: new ol.style.Circle({
				radius: 7,
				fill: new ol.style.Fill({
					color: '#ffcc33'
				})
			})
		})
	});
	var mapRast = layerService.init();
	mapRast.addLayer(vector);


	featureOverlay.setMap(mapRast);



	var modify = new ol.interaction.Modify({
		features: features,

	});
	var draw, geometryFunction, maxPoints;

	mapRast.addInteraction(modify);


	$scope.addInteraction = function(geomId) {
		$scope.removeInteraction();

		draw = new ol.interaction.Draw({
			features: features,
			source: source,
			type: geomId,
			geometryFunction: geometryFunction,
			maxPoints: maxPoints
		});
		mapRast.addInteraction(draw);
	}

	$scope.removeInteraction = function() {
		if (draw != null) {
			mapRast.removeInteraction(draw);
		}
	}
	$scope.initalDraw = function(draw) {
			draw = new ol.interaction.Draw({
				features: features,
				source: source,
				type: geomId,
				geometryFunction: geometryFunction,
				maxPoints: maxPoints
			});
			return draw;
		}
		// $scope.initalModify= function(){
		// 	var modify = new ol.interaction.Modify({
		//  			features: features,
		// 	});
		// }
});