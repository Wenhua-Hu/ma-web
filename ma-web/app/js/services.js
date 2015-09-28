'use strict';
/*global ol, source, window */
/**
 * @name ma-app.services
 * @description
 * This `ma-app.services` module contains the services of the app.
 */
angular.module('ma-app.services', [
  'ma-app.resources'
]).
factory('layerService', function($http, $rootScope, $window) {

    var service = {};
    var projection = {};
    projection['EPSG:28992'] = ol.proj.get('EPSG:28992');
    projection['EPSG:28992'].setExtent([0, 300000, 300000, 650000]);



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
        url: 'http://213.206.232.105/geoserver/BAG/wms',
        // url: 'http://localhost:8081/geoserver/crotecMap/wms',http://213.206.232.120:8080/geoserver/BAG/wms
        params: {
          LAYERS: 'BAG:pand',
          // LAYERS: 'crotecMap:pand',
          VERSION: '1.1.0'
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



    var style = new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255, 100, 50, 0.3)'
      }),
      stroke: new ol.style.Stroke({
        width: 9,
        color: 'rgba(255, 100, 50, 0.8)'
      }),
      image: new ol.style.Circle({
        fill: new ol.style.Fill({
          color: 'rgba(55, 200, 150, 0.5)'
        }),
        stroke: new ol.style.Stroke({
          width: 9,
          color: 'rgba(55, 200, 150, 0.8)'
        }),
        radius: 7
      }),
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
      projection: 'EPSG:28992',
    });
    vectorSource.addFeatures([pointFeature, circleFeature]);

    var vectorLayer = new ol.layer.Vector({
      name: 'test',
      source: vectorSource,
      style: style
    });
    //image vector
    //



    //wfs

    var geojsonFormat = new ol.format.GeoJSON();
  //   var wfsSourceOne = new ol.source.Vector({
  //     loader: function(extent,resolution, projection) {
  //       var url1 = 'http://213.206.232.105/geoserver/BAG/wfs?service=WFS&' +
  //       'version=1.1.0&request=GetFeature&typename=BAG:pand&' +
  //       'outputFormat=text/javascript&format_options=callback:loadFeatures' +
  //       '&srsname=EPSG:28992&bbox=' + extent.join(',') + ',EPSG:28992';
  //     $http({
  //       method: 'JSONP',
  //       url: url1

  //     }).then(function successCallback(response) {
  //       console.log("good"+response);

  //   // this callback will be called asynchronously
  //   // when the response is available
  // }, function errorCallback(response) {
  //   console.log("bad"+response);
  //     var geoJSON = new ol.format.GeoJSON();
  //     wfsSourceOne.addFeatures(geoJSON.readFeatures(response));
  //   // called asynchronously if an error occurs
  //   // or server returns response with an error status.
  // });
      //  var url = 'http://213.206.232.105/geoserver/BAG/wfs';
        // $http.jsonp(url, {
        //   params: {
        //     service: "WFS",
        //     version: "1.1.0",
        //     request: "GetFeature",
        //     typeName: "BAG:pand",
        //     outputFormat: "text/javascript",
        //   }
        // }).success(function(response) {
        //   wfsSourceOne.addFeatures(geojsonFormat.readFeatures(response));
        //   // add feature to layers

        //   // console.log(success.features);
        //   //Features = success;
        //   //    wfsSourceOne.getSource().addFeature(feature);


        // });
    //   },
    //   strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
    //     maxZoom: 13
    //   }))
    // });

var wfsSourceOne = new ol.source.Vector({
    loader: function(extent) {
        $http.jsonp('http://213.206.232.105/geoserver/BAG/wfs?format_options=callback:JSON_CALLBACK',{
            params: {
                service: 'WFS',
                version: '1.1.0',
                request: 'GetFeature',
                typename: 'BAG:pand',
                srsname: 'EPSG:28992',
                maxFeatures:'10',
                outputFormat: 'text/javascript',
                bbox: extent.join(',') + ',EPSG:28992'
                },
            }).success(loadFeatures);
        },
    strategy: ol.loadingstrategy.tile(new ol.tilegrid.createXYZ({
            maxZoom: 13
            })),

    });


// var wfsSourceOne = new ol.source.Vector({
//     loader: function(extent) {
//         $http.get('http://213.206.232.105/geoserver/BAG/wfs',{
//             params: {
//                 service: 'WFS',
//                 version: '1.1.0',
//                 request: 'GetFeature',
//                 typename: 'BAG:pand',
//                 srsname: 'EPSG:28992',
//                 maxFeatures:'1',
//                 outputFormat: 'application/json',
//                 bbox: extent.join(',') + ',EPSG:28992'
//                 },
//             }).success(loadFeatures);
//         },
//     strategy: ol.loadingstrategy.tile(new ol.tilegrid.createXYZ({
//             maxZoom: 13
//             })),

//     });
    var loadFeatures = function(response) {
      console.log("good" + response);
      var geoJSON = new ol.format.GeoJSON();
      wfsSourceOne.addFeatures(geoJSON.readFeatures(response));
    };



    var wfsLayerOne = new ol.layer.Vector({
      name: 'wfsLayerOne',
      source: wfsSourceOne,
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'rgba(0, 0, 255, 1.0)',
          width: 2
        })
      })
    });

    //var geojsonFormat = new ol.format.GeoJSON();
    //   var wfsVector =   new ol.layer.Image({
    //   source: new ol.source.ImageVector({
    //     source: wfsSourceOne,
    //     style: new ol.style.Style({
    //       fill: new ol.style.Fill({
    //         color: 'rgba(255, 255, 0, 0.6)'
    //       }),
    //       stroke: new ol.style.Stroke({
    //         color: '#319FD3',
    //         width: 1
    //       })
    //     })
    //   })
    // });


    // map.addLayer(pdok);
    // map.addLayer(bag);
    // map.addLayer(wfsVector);
    // map.addLayer(wfsLayerOne);
    var map = new ol.Map({
      target: 'map',
      logo: false,
      layers: [bag, wfsLayerOne],
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



    map.on('pointermove', function(evt) {
      console.log(map.getLayers().item(1).getSource().getFeatures());

      //console.log(Features);
      /*var url = map.getLayers().item(1).getSource().getGetFeatureInfoUrl(
        evt.coordinate, map.getView().getResolution(), map.getView().getProjection(),
        {'INFO_FORMAT': 'application/json'});
*/
      //console.log(map.getLayers().item(0));
      //hh

      //   map.getLayers().item(0).getSource().forEachFeature(function(feature) {
      //   console.log(feature);
      // });


      //   var test = map.getLayers().item(0);

      //   var pixel = map.getEventPixel(evt.originalEvent);
      //   var feature = map.forEachFeatureAtPixel(pixel, function(feature, layer) {
      //     console.log("123");
      //     console.log(feature);
      //     return feature;
      //   });
    });


    service.init = function() {
      return map;
    };
    service.wfs = function() {
      return wfsLayerOne;
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