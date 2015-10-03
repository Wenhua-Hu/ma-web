'use strict';
/*global ol, source, window */

angular.module('ma-app.geoservices', [
  'ma-app.resources'
]).
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
  });
