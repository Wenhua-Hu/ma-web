'use strict';
angular.module('ma-app.navigation', [
	'ngMaterial',
	'ui.bootstrap',
	'ngDialog'
]).
controller('navCtrl', function($scope, $rootScope, $timeout, layerService) {
	//alert();
	$scope.service = layerService;
	//$scope.SelectedFeatures = layerService.SelectedFeatures;
	// $scope.$on('cartAddItem', function() {
	//    $scope.cart = CartService.query();
	//    $scope.cartCount = Object.keys($scope.cart).length;
	//  });

   $scope.Features = layerService.SelectedFeatures;

	// $timeout(callAtTimeout, 10000);
	// $scope.Featurs = layerService.SelectedFeatures;
	// console.log("testA:" + $scope.Featurs);

	// 	$scope.$watch(layerService.SelectedFeatures, function() {
	// 	$scope.Features = layerService.SelectedFeatures;
	// 	console.log("check:"+$scope.Features);
	// });

	// function callAtTimeout() {
	// 	$scope.Featur = layerService.SelectedFeatures;
	// 	console.log("testB:" + $scope.Featur);


	// }


	
	// $scope.$watch('lastName',
	// 	function(newValue, oldValue) {
	// 		console.log('lastName Changed');
	// 		console.log(newValue);
	// 		console.log(oldValue);
	// 	}



});