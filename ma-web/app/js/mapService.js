'use strict';
/*global ol, source, window */
angular.module('ma-app.services', [
	'ma-app.resources'
]).
factory('mapService', function($http, $rootScope, $document) {

	if (!ol) return {};

	var map = {};
	projection['EPSG:28992'] = ol.proj.get('EPSG:28992');
	projection['EPSG:28992'].setExtent([0, 300000, 300000, 650000]);

	var ms = {
		map: map, // ol.Map
		init: init,
		getFeatures: getFeatures,
		selectFeature: selectFeature,
		hideFeatures: hideFeatures,
		unselectFeature: unselectFeature
	};

	var wfs_style = new ol.style.Style({
		fill: new ol.style.Fill({
			color: 'rgba(51,153,255, 0.3)'
		}),
		stroke: new ol.style.Stroke({
			width: 2,
			color: 'rgba(255, 100, 50, 0.8)'
		}),
		image: new ol.style.Circle({
			fill: new ol.style.Fill({
				color: 'rgba(55, 200, 150, 0.5)'
			}),
			stroke: new ol.style.Stroke({
				width: 1.25,
				color: 'rgba(55, 200, 150, 0.8)'
			}),
			radius: 5
		}),
	});

	return ms;

	function init(config) {
		// var config = angular.extend(defaults, config); 
		// map initialisation
		map = new ol.Map({
			target: 'map',
			logo: false,
			controls: [
				new ol.control.Rotate(),
				new ol.control.Attribution(),
				new ol.control.ScaleLine()
			],
			overlays: [mouseOverlay],
			view: new ol.View({
				projection: projection['EPSG:28992'],
				center: [155000, 463000],
				zoom: 13,
				minZoom: 0,
				maxZoom: 15,
			})
		});

		var pdokLayerData = {
			urlOfLayer: 'http://geodata.nationaalgeoregister.nl/wmsc',
			nameOfLayer: 'brtachtergrondkaart',
			naOfLayer: 'PDOK_WMS'
		};
		var bagLayerData = {
			urlOfLayer: 'http://213.206.232.105/geoserver/BAG/wms',
			nameOfLayer: 'BAG:pand',
			naOfLayer: 'BAG_WMS'
		};

		var pdok = createTileLayer(pdokLayerData);
		var bag = createTileLayer(bagLayerData);

		var bagWfsSource = new ol.source.Vector({
			na: 'BAG_WFS',
			loader: function(extent) {
				$http.jsonp('http://213.206.232.105/geoserver/BAG/wfs?format_options=callback:JSON_CALLBACK', {
						params: {
							service: 'WFS',
							version: '1.1.0',
							request: 'GetFeature',
							typename: 'BAG:pand',
							srsname: 'EPSG:28992',
							maxFeatures: '5',
							outputFormat: 'text/javascript',
							bbox: extent.join(',') + ',EPSG:28992'
						},
					})
					.success(function(response) {
						console.log(response);
						bagWfsSource.addFeatures(geoJSON.readFeatures(response));
					})
					.catch(function(response) {

					})
					.finally(function() {

					});
			},
			strategy: ol.loadingstrategy.bbox
		});

		var bagWfsLayer = new ol.layer.Vector({
			name: 'bagWfsLayer',
			source: bagWfsSource,
			style: wfs_style
		});

		addNewLayer(map, pdok, "pdok_wms");
		addNewLayer(map, bag, "bag_wms");
		addNewLayer(map, bagWfsLayer, "bag_wfs");

	}

	function createTileLayer(layerData) {

		return new ol.layer.Tile({
			na: layerData.naOfLayer,
			source: new ol.source.TileWMS({
				url: layerData.urlOfLayer,
				params: {
					LAYERS: layerData.nameOfLayer,
					VERSION: '1.1.1'
				},
				tileGrid: new ol.tilegrid.TileGrid({
					origin: [-285401.92, 22598.08],
					resolutions: [3440.64, 1720.32, 860.16, 430.08, 215.04, 107.52, 53.76, 26.88, 13.44, 6.72, 3.36, 1.68, 0.84, 0.42, 0.21],
					tileSize: 256
				}),
				projection: projection['EPSG:28992'],
				extent: [-285401.92, 22598.08, 595401.9199999999, 903401.9199999999]
			})
		});
	}



	function addNewLayer(map, mapLayer, nameOfLayer) {
		map.addLayer(mapLayer);
		var temp = {
			NameOf: nameOfLayer,
			Visivility: mapLayer.getVisible()
		};
		Layers.push(temp);
		LayerByName[nameOfLayer] = map.getLayers().get('length') - 1;
	}



});