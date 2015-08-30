'use strict';
 
var app = angular.module('myApp.blog', ['ngRoute','firebase','myApp.signup']);
 
// Declared route 
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/blog', {
        templateUrl: 'blog/blog.html',
        controller: 'BlogCtrl'
    });
}]);

//Generates the $firebaseAuth instance
app.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
  var ref = new Firebase("https://voice2.firebaseio.com");
  return $firebaseAuth(ref);
}]);

//auth is now used in controller
app.controller('BlogCtrl', ['$scope','$http','Auth','UserDataService','$location',function($scope,$http, Auth,UserDataService,$location) {
	  $scope.auth = Auth;
  	$scope.user = $scope.auth.$getAuth();

    $scope.username = UserDataService.getUser();
    if(!$scope.username){
      $location.path('/signup');
    }
	$http.get('data/blog.json').success(function(response){
		$scope.blogList = response;
	});
}]);

