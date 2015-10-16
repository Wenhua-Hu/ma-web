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


	$scope.clickToOpenImage = function($event) {

		$mdDialog.show({
			targetEvent: $event,
			templateUrl: '../partials/ImageSelection.html',
			controller: switchImageCtrl
		});

		
	};

	$scope.cancel = function($mdDialog) {
		$mdDialog.cancel();
	}




});

function switchImageCtrl($scope, $rootScope,$mdDialog, layerService) {
	$scope.datas = layerService;
		$scope.cancel = function() {
		$mdDialog.cancel();
	}
	$scope.getImage = function(url) {
		layerService.updateImage(url);
		$mdDialog.cancel();
	};
	$scope.pictures = [
	{
		title: 'Picture',
		content: [ {
			"ImageName": "3115TW012111",
			"ImageUrl": "img/icons/pic/3115TW012111.jpg"
		}, {
			"ImageName": "afsluiter-sprinkler",
			"ImageUrl": "img/icons/pic/afsluiter-sprinkler.png"
		}, {
			"ImageName": "brandmeldcentrale",
			"ImageUrl": "img/icons/pic/brandmeldcentrale.png"
		}, {
			"ImageName": "brandweeringang",
			"ImageUrl": "img/icons/pic/brandweeringang.png"
		}, {
			"ImageName": "droge-blusleiding-afnamepunt",
			"ImageUrl": "img/icons/pic/droge-blusleiding-afnamepunt.png"
		}, {
			"ImageName": "geboorde-put",
			"ImageUrl": "img/icons/pic/geboorde-put.png"
		}, {
			"ImageName": "lift",
			"ImageUrl": "img/icons/pic/lift.png"
		}, {
			"ImageName": "noodschakelaar-neon",
			"ImageUrl": "img/icons/pic/noodschakelaar-neon.png"
		}, {
			"ImageName": "overige-ingang",
			"ImageUrl": "img/icons/pic/overige-ingang.png"
		}, {
			"ImageName": "ondergrondse-brandkraan",
			"ImageUrl": "img/icons/pic/ondergrondse-brandkraan.png"
		}, {
			"ImageName": "opstelplaats-eerste-blusvoertuig",
			"ImageUrl": "img/icons/pic/opstelplaats-eerste-blusvoertuig.png"
		}, {
			"ImageName": "schakelaar-luchtbehandeling",
			"ImageUrl": "img/icons/pic/schakelaar-luchtbehandeling.png"
		}, {
			"ImageName": "sleutelkluis",
			"ImageUrl": "img/icons/pic/sleutelkluis.png"
		}, {
			"ImageName": "afsluiter-gas",
			"ImageUrl": "img/icons/pic/afsluiter-gas.png"
		}, {
			"ImageName": "afsluiter-water",
			"ImageUrl": "img/icons/pic/afsluiter-water.png"
		}, {
			"ImageName": "noodschakelaar-cv",
			"ImageUrl": "img/icons/pic/noodschakelaar-cv.png"
		}, {
			"ImageName": "opstelplaats-overige-blusvoertuig",
			"ImageUrl": "img/icons/pic/opstelplaats-overige-blusvoertuig.png"
		}, {
			"ImageName": "noodstop",
			"ImageUrl": "img/icons/pic/noodstop.png"
		}, {
			"ImageName": "w001",
			"ImageUrl": "img/icons/pic/w001.png"
		}, {
			"ImageName": "w002",
			"ImageUrl": "img/icons/pic/w002.png"
		}, {
			"ImageName": "w003",
			"ImageUrl": "img/icons/pic/w003.png"
		}, {
			"ImageName": "w002",
			"ImageUrl": "img/icons/pic/w001.png"
		}
		, {
			"ImageName": "w012",
			"ImageUrl": "img/icons/pic/w012.png"
		}
		, {
			"ImageName": "w016",
			"ImageUrl": "img/icons/pic/w016.png"
		}

		, {
			"ImageName": "w021",
			"ImageUrl": "img/icons/pic/w021.png"
		}
		, {
			"ImageName": "w023",
			"ImageUrl": "img/icons/pic/w023.png"
		}]
	}];
	$scope.tabs = [{
		title: 'Action',
		content: [{
			"ImageName": "exit_to_app",
			"ImageUrl": "img/icons/exit_to_app.svg"
		}, {
			"ImageName": "explore",
			"ImageUrl": "img/icons/explore.svg"
		}, {
			"ImageName": "home",
			"ImageUrl": "img/icons/home.svg"
		}, {
			"ImageName": "label",
			"ImageUrl": "img/icons/label.svg"
		}, {
			"ImageName": "polymer",
			"ImageUrl": "img/icons/polymer.svg"
		}, {
			"ImageName": "query_builder",
			"ImageUrl": "img/icons/query_builder.svg"
		}, {
			"ImageName": "receipt",
			"ImageUrl": "img/icons/receipt.svg"
		}, {
			"ImageName": "room",
			"ImageUrl": "img/icons/room.svg"
		}, {
			"ImageName": "search",
			"ImageUrl": "img/icons/search.svg"
		}, {
			"ImageName": "error",
			"ImageUrl": "img/icons/error.svg"
		}, {
			"ImageName": "warning",
			"ImageUrl": "img/icons/warning.svg"
		}

		]
	},  {
		title: 'Image',
		content: [{
			"ImageName": "adjust",
			"ImageUrl": "img/icons/image/ic_adjust_48px.svg"
		}, {
			"ImageName": "assistant_photo",
			"ImageUrl": "img/icons/image/ic_assistant_photo_48px.svg"
		}, {
			"ImageName": "audiotrack",
			"ImageUrl": "img/icons/image/ic_audiotrack_48px.svg"
		}, {
			"ImageName": "blur_circular",
			"ImageUrl": "img/icons/image/ic_blur_circular_48px.svg"
		}, {
			"ImageName": "blur_linear",
			"ImageUrl": "img/icons/image/ic_blur_linear_48px.svg"
		}, {
			"ImageName": "blur_off",
			"ImageUrl": "img/icons/image/ic_blur_off_48px.svg"
		}, {
			"ImageName": "blur_on",
			"ImageUrl": "img/icons/image/ic_blur_on_48px.svg"
		}, {
			"ImageName": "brush",
			"ImageUrl": "img/icons/image/ic_brush_48px.svg"
		}, {
			"ImageName": "camera",
			"ImageUrl": "img/icons/image/ic_camera_48px.svg"
		}, {
			"ImageName": "camera_alt",
			"ImageUrl": "img/icons/image/ic_camera_alt_48px.svg"
		}, {
			"ImageName": "camera_front",
			"ImageUrl": "img/icons/image/ic_camera_front_48px.svg"
		}, {
			"ImageName": "camera_rear",
			"ImageUrl": "img/icons/image/ic_camera_rear_48px.svg"
		}, {
			"ImageName": "camera_roll",
			"ImageUrl": "img/icons/image/ic_camera_roll_48px.svg"
		}, {
			"ImageName": "center_focus_strong",
			"ImageUrl": "img/icons/image/ic_center_focus_strong_48px.svg"
		}, {
			"ImageName": "color_lens",
			"ImageUrl": "img/icons/image/ic_color_lens_48px.svg"
		}, {
			"ImageName": "collections",
			"ImageUrl": "img/icons/image/ic_collections_48px.svg"
		}, {
			"ImageName": "colorize",
			"ImageUrl": "img/icons/image/ic_colorize_48px.svg"
		}
		]
	}, {
		title: 'Map',
		content: [{
			"ImageName": "beenhere",
			"ImageUrl": "img/icons/map/ic_beenhere_48px.svg"
		}, {
			"ImageName": "directions",
			"ImageUrl": "img/icons/map/ic_directions_48px.svg"
		}, {
			"ImageName": "directions_bike",
			"ImageUrl": "img/icons/map/ic_directions_bike_48px.svg"
		}, {
			"ImageName": "directions_bus",
			"ImageUrl": "img/icons/map/ic_directions_bus_48px.svg"
		}, {
			"ImageName": "directions_car",
			"ImageUrl": "img/icons/map/ic_directions_car_48px.svg"
		}, {
			"ImageName": "directions_subway",
			"ImageUrl": "img/icons/map/ic_directions_subway_48px.svg"
		}, {
			"ImageName": "directions_transit",
			"ImageUrl": "img/icons/map/ic_directions_transit_48px.svg"
		}, {
			"ImageName": "directions_walk",
			"ImageUrl": "img/icons/map/ic_directions_walk_48px.svg"
		}, {
			"ImageName": "flight",
			"ImageUrl": "img/icons/map/ic_flight_48px.svg"
		}, {
			"ImageName": "hotel",
			"ImageUrl": "img/icons/map/ic_hotel_48px.svg"
		}, {
			"ImageName": "layers",
			"ImageUrl": "img/icons/map/ic_layers_48px.svg"
		}, {
			"ImageName": "layers_clear",
			"ImageUrl": "img/icons/map/ic_layers_clear_48px.svg"
		}, {
			"ImageName": "local_airport",
			"ImageUrl": "img/icons/map/ic_local_airport_48px.svg"
		}, {
			"ImageName": "local_atm",
			"ImageUrl": "img/icons/map/ic_local_atm_48px.svg"
		}, {
			"ImageName": "local_bar",
			"ImageUrl": "img/icons/map/ic_local_bar_48px.svg"
		}, {
			"ImageName": "local_cafe",
			"ImageUrl": "img/icons/map/ic_local_cafe_48px.svg"
		}]
	}, {
		title: 'Navigation',
		content: [ {
			"ImageName": "arrow_back",
			"ImageUrl": "img/icons/navigation/ic_arrow_back_48px.svg"
		}, {
			"ImageName": "arrow_drop_down",
			"ImageUrl": "img/icons/navigation/ic_arrow_drop_down_48px.svg"
		}, {
			"ImageName": "arrow_drop_down_circle",
			"ImageUrl": "img/icons/navigation/ic_arrow_drop_down_circle_48px.svg"
		}, {
			"ImageName": "arrow_drop_up",
			"ImageUrl": "img/icons/navigation/ic_arrow_drop_up_48px.svg"
		}, {
			"ImageName": "arrow_forward",
			"ImageUrl": "img/icons/navigation/ic_arrow_forward_48px.svg"
		}, {
			"ImageName": "cancel",
			"ImageUrl": "img/icons/navigation/ic_cancel_48px.svg"
		}, {
			"ImageName": "check",
			"ImageUrl": "img/icons/navigation/ic_check_48px.svg"
		}, {
			"ImageName": "chevron_left",
			"ImageUrl": "img/icons/navigation/ic_chevron_left_48px.svg"
		}, {
			"ImageName": "chevron_right",
			"ImageUrl": "img/icons/navigation/ic_chevron_right_48px.svg"
		}, {
			"ImageName": "close",
			"ImageUrl": "img/icons/navigation/ic_close_48px.svg"
		}, {
			"ImageName": "expand_less",
			"ImageUrl": "img/icons/navigation/ic_expand_less_48px.svg"
		}, {
			"ImageName": "expand_more",
			"ImageUrl": "img/icons/navigation/ic_expand_more_48px.svg"
		}, {
			"ImageName": "fullscreen",
			"ImageUrl": "img/icons/navigation/ic_fullscreen_48px.svg"
		}, {
			"ImageName": "fullscreen_exit",
			"ImageUrl": "img/icons/navigation/ic_fullscreen_exit_48px.svg"
		}, {
			"ImageName": "menu",
			"ImageUrl": "img/icons/navigation/ic_menu_48px.svg"
		}, {
			"ImageName": "more_horiz",
			"ImageUrl": "img/icons/navigation/ic_more_horiz_48px.svg"
		}, {
			"ImageName": "more_vert",
			"ImageUrl": "img/icons/navigation/ic_more_vert_48px.svg"
		}, {
			"ImageName": "refresh",
			"ImageUrl": "img/icons/navigation/ic_refresh_48px.svg"
		}]
	}];

}



function switchLayerCtrl($scope, $rootScope, layerService) {
	$scope.datas = layerService;

	$scope.arrayLayers = [{
		nameOfLayer: 'pdok_wms',
		layerOfState: true,
		featureOfState: false
	}, {
		nameOfLayer: 'bag_wms',
		layerOfState: true,
		featureOfState: false
	}, {
		nameOfLayer: 'bag_wfs',
		layerOfState: true,
		featureOfState: true
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