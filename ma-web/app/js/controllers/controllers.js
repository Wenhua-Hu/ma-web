'use strict';
/*global ol, source,window,alert */

var controllerModule = angular.module('ma-app.controllers', [
	'ngMaterial',
	'ui.bootstrap',
	'ngDialog',
	'xml',
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
controller('MapCtrl', function($http, $scope, $window, x2js, layerService, geometryService, vectorService) {

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
	$scope.AddressList = [];
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
			then(function(data) {

					var AddressList = AddressParse(data);

					if (AddressList.length <= 0) {

					} else {
						angular.forEach(AddressList, function(value, key) {

								var coordinate = value.Point.pos["__text"];
								if (value.Address) {
									var addressInfo = "";
									var places;
									// if (value.Address.Place.length=="undefined") {

									// 	addressInfo=value.Address.Place["__text"];
									// 	console.log(addressInfo);
									// 	return;

									// }

									// angular.forEach(value.Address.Place, function(value, key) {
									// 	var subPlace = value;
									// 	addressInfo = " " + subPlace + addressInfo;
									// });

									// if (value.Address.PostalCode) {
									// 	var postcode = value.Address.PostalCode["__text"];
									// 	addressInfo = addressInfo + " " + postcode;
									// }

									// if (value.Address.StreetAddress) {
									// 	if (value.Address.StreetAddress.Street) {
									// 		var street = value.Address.StreetAddress.Street["__text"];
									// 		addressInfo = addressInfo + " " + street;
									// 		if (value.Address.StreetAddress.Building) {
									// 			var number = value.Address.StreetAddress.Building["_number"];
									// 			addressInfo = addressInfo + " " + number;
									// 			if (value.Address.StreetAddress.Building["_subdivision"]) {
									// 				var subdivision = value.Address.StreetAddress.Building["_subdivision"];
									// 				addressInfo = addressInfo + " " + subdivision;
									// 			}
									// 		}
									// 	}
									// }
								});

							console.log(addressInfo);
						}

					}
					// map.getView().setCenter(ol.proj.transform([n1, n2], 'EPSG:28992', 'EPSG:28992'));

				},
				function() {

				});
		}
	}
};

function AddressParse(data) {
	var response = x2js
		.xml_str2json(data.data)
		.GeocodeResponse
		.GeocodeResponseList;
	if (response) {
		var arrayList;
		var numberOfAddress = response['_numberOfGeocodedAddresses'];
		if (numberOfAddress == 1) {

			arrayList = [];
			arrayList.push(response.GeocodedAddress);
			console.log("good" + arrayList);
		} else {
			arrayList = response.GeocodedAddress;
		}
		return arrayList;
	} else {
		arrayList = [];
		return arrayList;
	}
}



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
var service = layerService; $scope.layersOfMap = [];

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