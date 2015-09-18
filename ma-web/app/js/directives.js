'use strict';

/**
 * @ngdoc overview
 * @name ma-app.directives
 *
 * @description
 * This `ma-app.directives` module contains the directives of the app.
 */
var directiveModule = angular.module('ma-app.directives', []).
directive('menucolor', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.bind('click', function() {
				scope.boolChangeColor = !scope.boolChangeColor;
				scope.$apply();
			});
		}
	};
});