'use strict';
/*global ol, source,window,alert */

var controllerModule = angular.module('ma-app.controllers', [
	'ngMaterial',
	'ui.bootstrap',
	'ngDialog',
	'xml',
	'angularResizable',

]).
controller('MainCtrl', function($scope, $mdSidenav, $mdDialog, $log) {
	// $scope.isShow = false;

	// $scope.toggleMapSidenav = function(menuId) {
	// 	$scope.isShow = !$scope.isShow;
	// };

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
controller('MapCtrl', function($http, $scope, $window, x2js, layerService, geometryService, vectorService) {

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
			layerService.map().getOverlays().item(1).setPosition([lon, lat]);
			$scope.currentLon = lon;
			$scope.currentLat = lat;
			$scope.lon = '';
			$scope.lat = '';
		}
	};
	var geoGML = ol.format.GML();
	$scope.showAddresslistInfo = [];
	$scope.submitByName = function() {
	//	$scope.showAddresslistInfo = [];
		layerService.addAddresses(null);
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


							var Coordinate = value.Point.pos["__text"];

							if (value.Address) {
								var addressInfo = "";
								var CountrySubdivision="",
									 Municipality ="",
						
									PostalCode="",
									Street = "",
									 NumberOfHouse="";
								
								var places;

								if (value.Address.Place.length == undefined) {
									
									addressInfo = value.Address.Place["__text"];
									CountrySubdivision=addressInfo;


								} else {
									

									angular.forEach(value.Address.Place, function(value, key) {

										Municipality = value["__text"];
							
										addressInfo = " " + Municipality + addressInfo;


									});

									if (value.Address.PostalCode) {
										PostalCode = value.Address.PostalCode["__text"];
										addressInfo = addressInfo + " " + PostalCode;
									}

									if (value.Address.StreetAddress) {
										if (value.Address.StreetAddress.Street) {
											Street = value.Address.StreetAddress.Street["__text"];
											addressInfo = addressInfo + " " + Street;
											if (value.Address.StreetAddress.Building) {
												NumberOfHouse = value.Address.StreetAddress.Building["_number"];
												addressInfo = addressInfo + " " + NumberOfHouse;
												if (value.Address.StreetAddress.Building["_subdivision"]) {
													var subdivision = value.Address.StreetAddress.Building["_subdivision"];
													NumberOfHouse= NumberOfHouse +" "+subdivision;
													addressInfo = addressInfo + " " + subdivision;
												}
											}
										}
									}

								}
								var AddressAndCoordinates = {
									"CountrySubdivision": CountrySubdivision,
									"Municipality": Municipality,
									"PostalCode": PostalCode,
									"Street": Street,
									"Number": NumberOfHouse,
									"Coordinate": Coordinate
								};
								//alert(AddressAndCoordinates.Municipality);
								
								var AddressAndCoordinate = {
									"Address": addressInfo,
				
									"Coordinate": Coordinate
								};

								layerService.addAddresses(AddressAndCoordinates);


							}
						});

					}
				},

				function() {

				});

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
				console.log(response);

				arrayList = [];
				arrayList.push(response.GeocodedAddress);
				//console.log("good" + arrayList);
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
	// for nav


	// $scope.Features = layerService.SelectedFeatures();
	////////



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