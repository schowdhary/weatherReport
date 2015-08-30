'use strict';
 
angular.module('myApp.signup', ['ngRoute','firebase'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/signup', {
        templateUrl: 'signup/signup.html',
        controller: 'SignupCtrl',
         resolve: {
      	"currentAuth": ["Auth", function(Auth) {
        return Auth.$waitForAuth();
      }]
    }
    });
}])

.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
	  var ref = new Firebase("https://voice2.firebaseio.com");
	  return $firebaseAuth(ref);
}])
 
// Register controller
.controller('SignupCtrl', ['$scope','$firebaseAuth','$location','Auth','currentAuth','UserDataService',function($scope,$firebaseAuth,$location,Auth,currentAuth,UserDataService) {

	$(document).ready(function(){
	  $('#login-form-link').click(function(e) {
			$("#login-form").delay(100).fadeIn(100);
	 		$("#register-form").fadeOut(100);
			$('#register-form-link').removeClass('active');
			$(this).addClass('active');
			e.preventDefault();
		});
		$('#register-form-link').click(function(e) {
			$("#register-form").delay(100).fadeIn(100);
	 		$("#login-form").fadeOut(100);
			$('#login-form-link').removeClass('active');
			$(this).addClass('active');
			e.preventDefault();
		});
	});
/*
	var firebaseObj = new Firebase("https://voice2.firebaseio.com"); 
	var loginObj = $firebaseAuth(firebaseObj);
*/
	    $scope.SignIn = function(e) {
		    e.preventDefault();
		    var username = $scope.user.email;
		    var password = $scope.user.password;
		    /*loginObj*/
		    Auth.$authWithPassword({
		            email: username,
		            password: password
		        })
		        .then(function(user) {
		            //Success callback
		            console.log('Login successful');
                    /*UserDataService.setSignSuccessState(true);
                    $scope.signSuccess=UserDataService.getSignSuccessState();

                    UserDataService.setSignSuccessMsg("Successfully logged in as ");
                    $scope.signSuccessMessage=UserDataService.getSignSuccessMsg();*/
		            
                    $scope.signSuccess = true;
		            $scope.logoutSuccess = false;
                    $scope.signSuccessMessage = "Successfully logged in as ";
		            UserDataService.setUser(username);
		            /*$location.path('/blog');*/
		        }, function(error) {
		            //Failure callback
		            console.log('Login failure');
		            $location.path('/signup');
		        });
		        
		}

		$scope.signUp = function(e) {
        if (!$scope.signupForm.$invalid) {
            var femail = $scope.fuser.email;
            var fpassword = $scope.fuser.password;
            var obj ={email:femail,password:fpassword};
            if (femail && fpassword) {
                Auth.$createUser(obj)
                    .then(function() {
                        $scope.regSuccess = true;
                    	$scope.regSuccessMessage = "Registration Successful";
                        console.log('User creation success');
                    }, function(error) {
                        $scope.regError = true;
                        $scope.regErrorMessage = error.message;
                        console.log(error);
                    });
           		}
        	}
    	};

    	$scope.LogOut = function(e) { 
            UserDataService.logoutUser();
    		$scope.signSuccess = false;
		    $scope.logoutSuccess = true;
            $scope.logoutSuccessMessage = "Successfully logged off.";
            /*$location.path('/home');*/
        };
}])

.service('UserDataService',['$location','$firebaseAuth','Auth' ,function($location,$firebaseAuth,Auth) {
    var user = '';
    var signSuccessState = '';
    var signSuccessMsg = '';

    return {
        getUser: function() {
        	if(user == ''){
        		user = localStorage.getItem('userEmail');
    		}
            return user;
        },
        setUser: function(value) {
        	localStorage.setItem("userEmail", value);
            user = value;
        },

        logoutUser:function(){
            Auth.$unauth();
            user='';
           /* signSuccessState = '';
            signSuccessMsg = '';*/
    		localStorage.removeItem('userEmail');
        /*    localStorage.removeItem('signSuccessState');
            localStorage.removeItem('signSuccessMsg');*/
            console.log('done logout');
            /*$location.path('/home');*/
        }

      /*  getSignSuccessState : function() {
            if(signSuccessState = ''){
               signSuccessState = localStorage.getItem('signSuccessState');
            }
            return signSuccessState;
        },
        setSignSuccessState : function(value) {
            localStorage.setItem("signSuccessState", value);
            signSuccessState = value;
        },

        getSignSuccessMsg : function() {
            if(signSuccessMsg = ''){
               signSuccessMsg = localStorage.getItem('signSuccessMsg');
            }
            return signSuccessMsg;
        },
        setSignSuccessMsg : function(value) {
            localStorage.setItem("signSuccessMsg", value);
            signSuccessMsg = value;
        }*/
    };
}]);






