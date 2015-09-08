'use strict';
/*global ol, source */
/**
 * @name ma-app.services
 * @description
 * This `ma-app.services` module contains the services of the app.
 */
angular.module('ma-app.services', [
  'ma-app.resources'
]).
factory('layerService', function() {

    var service = {};

    var projection = {};
    projection['EPSG:28992'] = ol.proj.get('EPSG:28992');
    projection['EPSG:28992'].setExtent([0, 300000, 300000, 650000]);

    var map = new ol.Map({
      target: 'map',
      logo: false,
      controls: [
        new ol.control.Rotate(),
        new ol.control.Attribution(),
        new ol.control.ZoomSlider()
      ],
      view: new ol.View({
        projection: projection['EPSG:28992'],
        center: [155000, 463000],
        zoom: 13,
        minZoom: 0,
        maxZoom: 15,
      })
    });
    /**
     * [pdok WMS layer]
     * @type {ol}
     */
    var pdok = new ol.layer.Tile({
      name: 'PDOK',
      source: new ol.source.TileWMS({
        url: 'http://geodata.nationaalgeoregister.nl/wmsc',
        params: {
          LAYERS: 'brtachtergrondkaart',
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
    /**
     * [bag WMS layer]
     * @type {ol}
     */
    var bag = new ol.layer.Tile({
      name: 'BAG',
      source: new ol.source.TileWMS({
        url: 'http://213.206.232.120:8080/geoserver/BAG/wms',
        params: {
          LAYERS: 'BAG:pandactueelbestaand',
          VERSION: '1.1.1'
        },
        tileGrid: new ol.tilegrid.TileGrid({
          origin: [-285401.92, 22598.08],
          resolutions: [3440.64, 1720.32, 860.16, 430.08, 215.04, 107.52, 53.76,
            26.88, 13.44, 6.72, 3.36, 1.68, 0.84, 0.42, 0.21
          ],
          tileSize: 512
        }),
        projection: projection['EPSG:28992'],
        extent: [-285401.92, 22598.08, 595401.9199999999, 903401.9199999999]
      })
    });

    var point = new ol.geom.Point(
      ol.proj.transform([5.37, 52.15], 'EPSG:4326', 'EPSG:28992')
    );
    var circle = new ol.geom.Circle(
      ol.proj.transform([5.37, 52.15], 'EPSG:4326', 'EPSG:28992'),
      500
    );
    var pointFeature = new ol.Feature(point);
    var circleFeature = new ol.Feature(circle);

    var vectorSource = new ol.source.Vector({
      projection: 'EPSG:28992'
    });
    vectorSource.addFeatures([pointFeature, circleFeature]);

    var vectorLayer = new ol.layer.Vector({
      name: 'test',
      source: vectorSource
    });

    map.addLayer(pdok);
    map.addLayer(bag);
    map.addLayer(vectorLayer);

    service.init = function() {
      return map;
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
      name: 'Point',
      img: 'point.jpg'
    }, {
      id: '2',
      name: 'LineString',
      img: 'lineString.jpg'
    }, {
      id: '3',
      name: 'Polygon',
      img: 'pologon.jpg'
    }, {
      id: '4',
      name: 'Circle',
      img: 'circle.jpg'
    }, {
      id: '5',
      name: 'Square',
      img: 'square.jpg'
    }, {
      id: '6',
      name: 'Box',
      img: 'box.jpg'
    }, {
      id: '7',
      name: 'None',
      img: 'text.jpg'
    }, {
      id: '7',
      name: 'modify',
      img: 'location.jpg'
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
});