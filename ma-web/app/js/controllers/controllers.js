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


	$scope.geomCategories = geometryService.getGeometryCategories();

	var vector = vectorService.addVector();
	var features = vector.getSource().getFeaturesCollection();
	var mapSource = vectorService.addSource();
	var map = layerService.map();
	//var wfs = layerService.wfs();
	//map.addLayer(vector);



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


	// mouse single click to triger the event to show property based on specific layer
	map.on('singleclick', function(e) {
		layerService.updateSelectedFeatures(null);
		var feature = map.forEachFeatureAtPixel(e.pixel, function(feature, layer) {

			var temp = {
				id: feature.getId(),
				gid: feature.get('gid'),
				geometry_name: feature.get('geometry_name'),
				begindatumtijdvakgeldigheid: feature.get('begindatumtijdvakgeldigheid')
			};
			layerService.updateSelectedFeatures(temp);
			console.log(temp);
		}, null, function(layer) {
			return layer === map.getLayers().item(layerService.LayerByName()['bag_wfs']);
		});
		//console.log(layerService.SelectedFeatures()[0].get("gid"));
		//console.log(layerService.SelectedFeatures().length);

	});

	// map.on('dblclick', function(e) {

	// 	//console.log(layerService.SelectedFeatures()[0].getId());

	// });


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


	var vectorLayerMarker;
	var iconStyle = new ol.style.Style({
		image: new ol.style.Icon(({
			anchor: [0.5, 0.5],
			anchorXUnits: 'fraction',
			anchorYUnits: 'pixels',
			scale: 0.5,
			opacity: 0.5,
			src: '../img/select.svg'
		}))
	});



	var vectorSourceMarker;

	map.on('singleclick', function(e) {
		// vectorSourceMarker.clear();
		//vectorSourceMarker.addFeature(iconFeature);

		var pos = e.coordinate;



		var iconFeature = new ol.Feature({
			geometry: new ol.geom.Point(pos)
		});
		iconFeature.setStyle(iconStyle);
		vectorSourceMarker = new ol.source.Vector({
			features: [iconFeature]
		});
		vectorLayerMarker = new ol.layer.Vector({
			source: vectorSourceMarker
		});

		//map.getView().setCenter(geolocation.getPosition());
		map.addLayer(vectorLayerMarker);
		//console.log(layerService.SelectedFeatures()[0].getId());

	});


}).controller('testController', function($scope, $rootScope, layerService) {
	// TestService.getResult().then(function(success) {
	// 	//$scope.showResult = success.data;
	// });
});