(function () {

    'use strict';


    angular
        .module('HomeModule')
        .controller('SectionsController', SectionsController)
        .factory('secsService', function () {
            return getSections($rootScope.filmName);
        });


    angular.$inject = ['$rootScope', '$window', '$http','$scope', '$location'];

    function SectionsController($rootScope, $window, $http, $scope, $location) {
       

       // $scope.secs = getSections;
        $scope.setSecAndGo = setSecAndGo;


        $scope.getSections = function()
        {
           // debugger;

            var filmName = $rootScope.film;
            $scope.filmName = filmName;
            $window.alert("Film Name : " + filmName);
            $http.get('http://localhost:54905/api/section/' + filmName).then(HandleSuccess, HandleError('Error getting sections'));
            //return $scope.secs;
        }


        function HandleSuccess(res) {
            debugger;
            $scope.secs = res.data;
            //return res.data;
        }

        function HandleError(ermessage) {
            return function () {
                return { success: false, message: ermessage };
            };
        }
        function setSecAndGo(sectionID) {
            $rootScope.sectionID = sectionID;
            $location.path('/seats');
        }


    }







})();