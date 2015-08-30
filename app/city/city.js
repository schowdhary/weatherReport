'use strict';
 
angular.module('myApp.city', ['ngRoute','ui.bootstrap'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/city', {
        templateUrl: 'city/city.html',
        controller: 'cityListCtrl'
    })
    .otherwise({
    	redirectTo: '/city'
    });
}])

.controller('cityListCtrl', ['$scope','$modal','$http',function($scope,$modal,$http) {
	//Making the list available to scope
	$http.get('data/city.json').success(function(response){
		$scope.cityList = response;
	});

	$scope.cityData={};
	$scope.openModal = function (pincode) {
	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: 'myModalContent.html',
	      controller: 'ModalInstanceCtrl',
	      scope : $scope,
	      resolve: {
	      	cityData: function () {
          	return $scope.cityData;
        	}
	      }
	});

	$http({ method: 'GET', url: 'http://api.openweathermap.org/data/2.5/weather?zip='+pincode+',in' }).
		success(function (data, status) {
			$scope.cityData=data;
			console.log(data);
		}).
		error(function (data, status) {
		   console.log("Error getting the data");
		});
	}

}])

.controller('ModalInstanceCtrl',['$scope', '$modalInstance',function ($scope, $modalInstance) {
	
		$scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		};

}]);
