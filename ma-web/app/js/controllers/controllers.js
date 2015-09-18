'use strict';
/*global ol, source,window,alert */

var controllerModule = angular.module('ma-app.controllers', [
	'ngMaterial'
]).
controller('MainCtrl', function($scope, $mdSidenav, $mdDialog, $log) {
	$scope.isShow = false;

	$scope.toggleMapSidenav = function(menuId) {
		$scope.isShow = !$scope.isShow;
		if (($mdSidenav(menuId).isLockedOpen()) && ($scope.isShow)) {
			// color 
			$("#menu").css("color", "#81d4fa");
		} else {
			$("#menu").css("color", "white");
		}

		//watch($scope.isShow, listener, objectEquality)
		// if ($mdSidenav(menuId).isOpen()) {
		// 	$mdSidenav(menuId).toggle();
		// }

		// 	$mdSidenav(menuId)
		// .open()
		// .then(function(){
		//   $log.debug($mdSidenav(menuId).isLockedOpen());
		//   //console
		// });

		//  if ($mdSidenav(menuId).isLockedOpen()) {
		// 	//alert($mdSidenav(menuId).isLockedOpen());
		// $mdSidenav(menuId).toggle();
		// }
		// if (!$mdSidenav(menuId).isLockedOpen()) {
		// 	alert($mdSidenav(menuId).isLockedOpen());
		// $mdSidenav(menuId).toggle();
		// }
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
controller('MapCtrl', function($window, $http, $scope, layerService, geometryService, vectorService) {

	$scope.geomCategories = geometryService.getGeometryCategories();

	var vector = vectorService.addVector();
	var features = vector.getSource().getFeaturesCollection();
	var mapSource = vectorService.addSource();
	var mapViewer = layerService.init();

	mapViewer.addLayer(vector);
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
			mapViewer.addInteraction(this.geometry);
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
			mapViewer.addInteraction(this.selection);

			return this.selection;
		}
	};

	var modify = {
		init: function(features) {
			this.modification = new ol.interaction.Modify({
				features: features
			});
			mapViewer.addInteraction(this.modification);
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
			mapViewer.addInteraction(this.snaping);
			return this.snaping;
		}
	};

	var removeInteraction = function() {
		if (draw !== null) {
			mapViewer.removeInteraction(drawInit);
		}
	};

	$scope.addInteraction = function(geomId) {
		// var parser = new ol.format.WMSCapabilities();


		//       $http.get('js/controllers/wms-getcapabilities.xml').then(function(response) {
		// 	  var result = parser.read(response.data);

		// 	 alert(JSON.stringify(result, null, 2));
		// });
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
		} else {

			// mapViewer.on('singleclick', function(evt) {

			// 	var viewResolution = mapViewer.getView().getResolution();
			// 	var url = wmsSource.getGetFeatureInfoUrl(
			// 		evt.coordinate, viewResolution, 'EPSG:3857', {
			// 			'INFO_FORMAT': 'text/html'
			// 		});
			// 	if (url) {
			// 		alert()
			// 		document.getElementById('info').innerHTML =
			// 			'<iframe seamless src="' + url + '"></iframe>';
			// 	}
			// });

			//http://demo.boundlessgeo.com/geoserver/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=ne%3Ane&LAYERS=ne%3Ane&INFO_FORMAT=text%2Fhtml&I=15&J=230&WIDTH=256&HEIGHT=256&CRS=EPSG%3A3857&STYLES=&BBOX=0%2C0%2C20037508.342789244%2C20037508.342789244

		}


		//snap.init();

	};
}).
controller('testController', function($scope, $rootScope, TestService) {
	TestService.getResult().then(function(success) {
		$scope.showResult = success.data;
	});
});