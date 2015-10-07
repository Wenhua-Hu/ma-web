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


// app.directive('resize', function ($window) {
//     return function (scope, element) {
//         var w = angular.element($window);
//         scope.getWindowDimensions = function () {
//             return {
//                 'h': w.height(),
//                 'w': w.width()
//             };
//         };
//         scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
//             scope.windowHeight = newValue.h;
//             scope.windowWidth = newValue.w;

//             scope.style = function () {
//                 return {
//                     'height': (newValue.h - 100) + 'px',
//                         'width': (newValue.w - 100) + 'px'
//                 };
//             };

//         }, true);

//         w.bind('resize', function () {
//             scope.$apply();
//         });
//     }
// });
