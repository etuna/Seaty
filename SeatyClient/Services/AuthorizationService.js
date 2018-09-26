(function () {

    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);


    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$timeout', 'UserService'];
    function AuthenticationService($http, $cookies, $rootScope, $timeout, UserService) {

        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;
    }


    function Login(username, password, callback) {

        $timeout(function () {
            var response;
            UserService.getByUsername(username)
                .then(function (user) {
                    if (user !== null && user.password === password) {
                        response = { success: true };
                    } else {
                        response = { success: false, message: 'Username or password is incorrect!' };
                    }
                    calback(response);
                });
        }, 1000);
    }


    function SetCredentials(username, password) {
        $rootScope.globals = {
            //Current User
            currentUser = {
                username: username,
                password: password
            }
        };

        $http.defaults.headers.common['Authorization'] = 'Basic ' + username + ' ' + password;

        // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
        var cookieExp = new Date();
        cookieExp.setDate(cookieExp.getDate() + 7);
        $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
    }


    function ClearCredentials() {
        $rootScope.globals = {};
        $cookies.remove('globals');
        $http.defaults.headers.common.Authorization = 'Basic';
    }

});