'use strict';
/*global ol, source,window,alert */
angular.module('ma-app.settings', [
	'ngMaterial',
	'ui.bootstrap',
	'ngDialog'
]).
controller('settingCtrl-1', function($scope, $rootScope, ngDialog, $mdDialog) {

	$scope.clickToOpen = function($event) {
		ngDialog.open({
			targetEvent: $event,
			templateUrl: '../partials/layerSelection.html',
			controller: switchLayerCtrl
		});
	};
});

function switchLayerCtrl($scope, $rootScope, layerService) {
	$scope.datas =layerService;

	$scope.arrayLayers = [{
		nameOfLayer: 'pdok_wms',
		layerOfState: true,
		featureOfState:false
	}, {
		nameOfLayer: 'bag_wms',
		layerOfState: true,
		featureOfState:false
	}, {
		nameOfLayer: 'bag_wfs',
		layerOfState: true,
		featureOfState:true
	}];

	$scope.onChange = function(layername, layerState) {
		if (layerState) {
			layerService.map().getLayers().item(layerService.LayerByName()[layername]).setVisible(true);
		} else {
			layerService.map().getLayers().item(layerService.LayerByName()[layername]).setVisible(false);
		}
	};

	$scope.onFeatureChange = function(layername, layerState, featureState) {
		if (layerState && featureState) {
			// $rootScope.map.getLayers().item($rootScope.LayerByName[layername]).setVisible(true);
		} else {
			// $rootScope.map.getLayers().item($rootScope.LayerByName[layername]).setVisible(false);
		}
	};
}