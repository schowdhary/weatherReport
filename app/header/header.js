'use strict';

angular.module('myApp.header',['myApp.signup'])

.controller('HeaderCtrl',['$scope','UserDataService',function($scope, UserDataService){
	$scope.username = UserDataService.getUser();
/*	if($scope.username){
	$("#signupHead").text($scope.username);
}*/

}]);