'use strict';
/*global ol, source */
/**
 * @name ma-app.services
 *
 * @description
 * This `ma-app.services` module contains the services of the app.
 */
angular.module('ma-app.services', [
  'ma-app.resources'
]).
factory('layerService', function() {
    var service = {};

    var osm = new ol.layer.Tile({
           source: new ol.source.MapQuest({ layer: 'osm'
       })
     });
     var control = [
         new ol.control.Rotate(), 
         new ol.control.Attribution(), 
         new ol.control.ZoomSlider()
     ];
     var view = new ol.View({
       center: [0, 0],
       zoom: 6,
       minZoom: 3,
       maxZoom: 20,
     //  projection: 4326
     });
     var map = new ol.Map({
       target: 'crotec-map',
       layers: [osm],
       controls: control,
       view: view
     });

    service.init = function() {
      return map;
    };
return service;
}).
factory('geometryService', function() {
    var service={};

    var geometryCategories =[
      {id:'1', name:'Point',img: 'point-1.png'},
      {id:'2', name:'LineString',img: 'point-1.png'},
      {id:'3', name:'Polygon',img: '3.png'},
      {id:'4', name:'Circle',img: '2.png'},
      // {id:'5', name:'Square',img: 'point-1.png'},
      // {id:'6', name:'Box',img: 'point-1.png'}, 
      // {id:'7', name:'None',img: 'point-1.png'},    
    ];

    service.getGeometryCategories = function() {
        return geometryCategories;
    };
    return service;
});