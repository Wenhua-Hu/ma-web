'use strict';
angular.module('ma-app.settings', [
	'ngMaterial',
	'ui.bootstrap',
	'ngDialog'
]).
controller('settingCtrl-1', function($scope,ngDialog) {
	    $scope.clickToOpen = function() {
	    	ngDialog.open({ template: '../partials/externalTemplate.html' });
    };
});
// controller('settingCtrl-2', function($scope,ngDialog) {
// 	    $scope.clickToOpen = function () {
//         ngDialog.open({ template: 'popupTmpl.html' });
//     };
// }).
// controller('settingCtrl-3', function($scope,ngDialog) {
// 	    $scope.clickToOpen = function () {
//         ngDialog.open({ template: 'popupTmpl.html' });
//     };
// }).
// controller('settingCtrl-4', function($scope,ngDialog) {
// 	    $scope.clickToOpen = function () {
//         ngDialog.open({ template: 'popupTmpl.html' });
//     };
// });
