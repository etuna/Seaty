
(function () {
    'use strict';

    angular
        .module('HomeModule', ['ngRoute', 'ngCookies','ui.bootstrap'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
       
         $routeProvider
             .when('/', {
                controller: 'FilmViewController',
                templateUrl: 'Views/FilmsView.html',
                controllerAs: 'vm'
            })

             .when('/sections', {
                 controller: 'SectionsController',
                templateUrl: 'Views/SectionsView.html',
                controllerAs: 'vm'
            })

            .when('/seats', {
                controller: 'SeatsController',
               // controller: 'ModalController',
                templateUrl: 'Views/SeatsView.html',
                controllerAs: 'vm'
            })

             .otherwise({ redirectTo: '/test' });
        
         //$locationProvider.html5Mode(true);
         $locationProvider.hashPrefix('');
    }
     
    run.$inject = ['$rootScope', '$location', '$http'];
    function run($rootScope, $location, $http) {

        var user = {
            username: "etuna",
            password: "1234"
        }
        $rootScope.currentUser = user;
       // $window.location = '/asd';

        // keep user logged in after page refresh
        if ($rootScope.currentUser) {
           // $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;

        } else {


            var user = {
                username: "etuna",
                password: "1234"
            }
            $rootScope.currentUser = user;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/sections', '/seats']) === -1;
            var loggedIn = $rootScope.currentUser;
            if (restrictedPage && !loggedIn) {
               // $location.path('/home');
            }
        });
    }

})();