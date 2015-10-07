'use strict';
/*global ol, source,window,alert */

var controllerModule = angular.module('ma-app.controllers', [
	'ngMaterial',
	'ui.bootstrap',
	'ngDialog'
]).
controller('MainCtrl', function($scope, $mdSidenav, $mdDialog, $log) {
	$scope.isShow = false;


	$scope.toggleMapSidenav = function(menuId) {
		$scope.isShow = !$scope.isShow;

	};



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
controller('MapCtrl', function($http, $scope, layerService, geometryService, vectorService) {

	// 	$scope.a= layerService.a;
	$scope.geomCategories = geometryService.getGeometryCategories();

	var vector = vectorService.addVector();
	var features = vector.getSource().getFeaturesCollection();
	var mapSource = vectorService.addSource();
	var map = layerService.map();
	//	var bagUrl = "https://geodata.nationaalgeoregister.nl/geocoder/Geocoder?zoekterm=";
	//var wfs = layerService.wfs();
	//map.addLayer(vector);
	//
	//FOR SEAR PLACE
	//search the location
	$scope.currentLon = map.getView().getCenter()[0];
	$scope.currentLat = map.getView().getCenter()[1];
	$scope.currentAddress = "Adres Naam";
	map.on('moveend', function(e) {
		var currentCoordinate = map.getView().getCenter();
		$scope.currentLon = currentCoordinate[0];
		$scope.currentLat = currentCoordinate[1];

	});
	$scope.submitByCoordinate = function() {
		if ($scope.lon && $scope.lat) {
			var lon = $scope.lon,
				lat = $scope.lat;
			map.getView().setCenter(ol.proj.transform([lon, lat], 'EPSG:28992', 'EPSG:28992'));
			$scope.currentLon = lon;
			$scope.currentLat = lat;
			$scope.lon = '';
			$scope.lat = '';
		}
	};
	var geoGML = ol.format.GML();
	$scope.submitByName = function() {
		if ($scope.address) {
			var address = $scope.address;
			$http.get('https://geodata.nationaalgeoregister.nl/geocoder/Geocoder', {
				dataType: 'json',
				params: {
					zoekterm: address
				},
			}).
			then(function(success) {
					var data = success.data;
					console.log(data);
					var xmlSnipetA = '<gml:pos dimension="2">';
					var xmlSnipetB = '</gml:pos>';

					var coordinateDate = data.split('<gml:pos dimension="2">')
						.pop()
						.split('</gml:pos>')
						.shift();
					console.log(coordinateDate);

					var temp = coordinateDate.split(" ");
					var n1 = parseFloat(temp[0]);

					var n2 = parseFloat(temp[1]);
					console.log(n1);
					console.log(n2);
					map.getView().setCenter(ol.proj.transform([n1, n2], 'EPSG:28992', 'EPSG:28992'));



				},
				function() {

				});
			// map.getView().setCenter(ol.proj.transform([lon, lat], 'EPSG:28992', 'EPSG:28992'));
			// $scope.currentAddress = address;
			// $scope.address = '';
		}
	};



	// search by address name



	//END OF SEARCH PLAC3E



	var geometryFunction, maxPoints;
	var drawInit, modifyInit;

	var draw = {
		init: function(geomId) {
			this.geometry = new ol.interaction.Draw({
				features: features,
				source: mapSource,
				type: geomId,
				geometryFunction: geometryFunction
			});
			removeInteraction();
			map.addInteraction(this.geometry);
			return this.geometry;
		},
		setActive: function(active) {
			//modifyInit.setActive(!active);
			drawInit.setActive(active);
			snap.init();
		}
	};

	var select = {
		init: function() {
			this.selection = new ol.interaction.Select();
			map.addInteraction(this.selection);

			return this.selection;
		}
	};

	var modify = {
		init: function(features) {
			this.modification = new ol.interaction.Modify({
				features: features
			});
			map.addInteraction(this.modification);
			return this.modification;
		},
		setActive: function(active) {
			drawInit.setActive(!active);
			modifyInit.setActive(active);
			snap.init();
		}
	};

	var snap = {
		init: function() {
			this.snaping = new ol.interaction.Snap({
				source: vector.getSource()
			});
			map.addInteraction(this.snaping);
			return this.snaping;
		}
	};

	var removeInteraction = function() {
		if (draw !== null) {
			map.removeInteraction(drawInit);
		}
	};

	$scope.addInteraction = function(geomId) {


		if (geomId !== null) {
			if (geomId === "modify") {
				var selectOption = select.init();
				var features = selectOption.getFeatures();
				modifyInit = modify.init(features);
				modify.setActive(true);

			} else if (geomId === "move") {

			} else {
				drawInit = draw.init(geomId);
				draw.setActive(true);

			}
		} else {}
		//snap.init();
	};


	//get layers
	var service = layerService;
	$scope.layersOfMap = [];

	$scope.addLayers = function() {
		angular.forEach(service.map().getLayers(), function(layer, key) {
			var temp = {
				"LayerName": layer.getSource(),
				"Visibility": layer.getVisible()
			};
			$scope.layersOfMap.push(temp);
		});
		return $scope.layersOfMap;
	};
	//add marker
}).controller('testController', function($scope, $rootScope, layerService) {
	// TestService.getResult().then(function(success) {
	// 	//$scope.showResult = success.data;
	// });
});