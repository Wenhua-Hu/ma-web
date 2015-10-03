'use strict';
/*global ol, source, window */

angular.module('ma-app.vectorservices', [
  'ma-app.resources'
]).
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