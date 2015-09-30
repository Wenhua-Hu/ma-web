'use strict';
/*global ol, source, window */
/**
 * @name ma-app.services
 * @description
 * This `ma-app.services` module contains the services of the app.
 */
//   self.getClassname = function(string) {
//   var obj = {
//     '1' : even,
//     '2' : odd
//   };
//   return obj[string];
// };
angular.module('ma-app.services', [
  'ma-app.resources'
]).
factory('layerService', function($http, $rootScope, $window) {

    var service = {},
      projection = {};
    $rootScope.LayerByName = [];

    projection['EPSG:28992'] = ol.proj.get('EPSG:28992');
    projection['EPSG:28992'].setExtent([0, 300000, 300000, 650000]);

    $rootScope.map = new ol.Map({
      target: 'map',
      logo: false,
      controls: [
        new ol.control.Rotate(),
        new ol.control.Attribution(),
        new ol.control.ScaleLine()
      ],
      view: new ol.View({
        projection: projection['EPSG:28992'],
        center: [155000, 463000],
        zoom: 13,
        minZoom: 0,
        maxZoom: 15,
      })
    });

    //ADD   LAYER
    //wms data
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
    // WMS CREATE LAYER
    var createTileLayer = function(layerData) {

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
    };

    $rootScope.pdok = createTileLayer(pdokLayerData);
    var bag = createTileLayer(bagLayerData);
    //CREATE WFS LAYER
    //
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

    var geoJSON = new ol.format.GeoJSON();

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

    function addNewLayer(map, mapLayer, nameOfLayer) {
      $rootScope.map.addLayer(mapLayer);
      $rootScope.LayerByName[nameOfLayer] = map.getLayers().get('length') - 1;
    }

    addNewLayer($rootScope.map, $rootScope.pdok, "pdok_wms");
    addNewLayer($rootScope.map, bag, "bag_wms");
    addNewLayer($rootScope.map, bagWfsLayer, "bag_wfs");

    function olMapFeatures(nameOfLayer) {
      var index = 2;
      var featuresArray = $rootScope.map //ol.Map
        .getLayers() //ol.Collection
        .getArray()[index] //ol.layer.Vector
        .getSource() //ol.source.KML
        .getFeatures(); //ol.Feature
      return featuresArray;

    }

    //wfs


    // *******************Image Vector******************************************
    //   var wfsLayerOne = new ol.layer.Image({
    //     name: 'wfsLayerOne',
    //     source: new ol.source.ImageVector({
    //       source: bagWfsVector
    //     }),
    //     style: wfs_style
    //   });
    // *************************************************************************


    $rootScope.map.on('pointermove', function(e) {
      //console.log(map.getLayers().item(2).getSource().getFeatures());
      var feature = $rootScope.map.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
        console.log(feature);
      });

    });



// //wfs highlight
// var select = null;
// var selectSingleClick = new ol.interaction.Select();

// var changeInteraction = function() {
//   if (select !== null) {
//     map.removeInteraction(select);
//   }

//     select = selectSingleClick;

//   if (select !== null) {
//     $rootScope.map.addInteraction(select);

//   }
// };


// /**
//  * onchange callback on the select element.
//  */

// changeInteraction();


    //$rootScope.map.removeLayer($rootScope.map.getLayers().item(0));
    service.init = function() {
      return $rootScope.map;
    };
    service.wfs = function() {
      return bagWfsLayer;
    };
    return service;
  }).
  /**
   * [vector layer]
   * @return {[type]} [description]
   */
factory('geometryService', function() {
    var service = {};

    var geometryCategories = [{
      id: '1',
      name: 'Hand',
      img: 'hand.jpg'
    }, {
      id: '2',
      name: 'Point',
      img: 'point.jpg'
    }, {
      id: '3',
      name: 'LineString',
      img: 'lineString.jpg'
    }, {
      id: '4',
      name: 'Polygon',
      img: 'pologon.jpg'
    }, {
      id: '5',
      name: 'Circle',
      img: 'circle.jpg'
    }, {
      id: '6',
      name: 'Square',
      img: 'square.jpg'
    }, {
      id: '7',
      name: 'Box',
      img: 'box.jpg'
    }, {
      id: '8',
      name: 'None',
      img: 'text.jpg'
    }, {
      id: '9',
      name: 'modify',
      img: 'modify.jpg'
    }, ];

    service.getGeometryCategories = function() {
      return geometryCategories;
    };
    return service;
  }).
  /**
   * [vector service]
   * @param  {Object} ) {var service [description]
   * @return {[type]}   [description]
   */
factory('vectorService', function() {

  var service = {};
  var features = new ol.Collection();
  var source = new ol.source.Vector({
    features: features,
    wrapX: false,
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

  return {
    addFeature: function() {
      return features;
    },
    addVector: function() {
      return vector;
    },
    addSource: function() {
      return source;
    }
  };
}).
factory('TestService', function($http, apiUrl) {
  return {
    getResult: function() {
      return $http.get(apiUrl.root);
    }
  };
});