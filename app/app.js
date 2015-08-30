'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ngRoute','myApp.home','myApp.signup','myApp.city','myApp.blog','myApp.header'])
.config(['$routeProvider', function($routeProvider) {
  
 	$routeProvider.otherwise({
        redirectTo: '/home'
   	});

}]);
