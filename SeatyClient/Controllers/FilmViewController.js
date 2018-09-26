(function () {


    'use strict';

    angular
        .module('HomeModule')
        .controller('FilmViewController', FilmViewController);


    FilmViewController.$inject = ['$rootScope', '$window', '$scope','$location'];

    function FilmViewController($rootScope, $window,$scope,$location) {

        var currUser = $rootScope.currentUser;
        $rootScope.testText = "test text";
        $scope.testText = $rootScope.testText;
        $scope.setFilm = setFilm;
       $scope.setAndGo = setAndGo;


        function setFilm(filmName) {
            $rootScope.film = filmName;
        }

        function setAndGo(filmName) {
            setFilm(filmName);
            $location.path('/sections');
        }
    }


   

})();