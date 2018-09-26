// JavaScript source code
(function () {

    'use strict';

    angular.module('app').controller('IndexController', IndexController);



    function IndexController($location, $window, $scope) {

        $scope.login = login;
        $scope.register = register;
        $scope.testDB = testDB;
        

        $scope.loginModel = {
            username: "",
            password: "",
            error :""
        };


        //(function () {
        //     $window.location.href = "asd";
        //   })();

      //  (function () {
      //      setTimeout(function () {
       //         $scope.loginModel.username = "changed";
       //         $scope.$apply();
       //     }, 2000);
            // $window.location = "/asd";
      //  })();




        function login() {
            
            //$window.alert($scope.loginModel.username + " " + $scope.loginModel.password);
            $window.alert(btoa($scope.loginModel.username + ':' + $scope.loginModel.password));

            $.ajax({
                
                type : 'GET',
                url: 'http://localhost:54905/api/seating',
                headers: {
                    'Authorization': 'Basic ' + btoa($scope.loginModel.username + ':' + $scope.loginModel.password)
                },
                dataType :  'json',
                success: function (data) {
                    $scope.$apply(function () {

                       // $.each(data, function (index, value) {

                          //  if (value.HallID == "H2") { 
                        //    $scope.loginModel.error = "" + value.HallID;
                      //  }
                            //$scope.loginModel.error = JSON.stringify(data[0]);

                        $scope.loginModel.error = "Success!";
                        $window.location = "Home.html";

                        //});
                        //$window.alert('OKAY!');
                    });
                },
                complete : function (jqXHR) {
                    if (jqXHR.status == 200) {
                
                        $scope.loginModel.error += "";
                      

                    } else {
                        $scope.$apply(function () {
                            $scope.loginModel.error = "Username or Password is incorrect! : " + jqXHR.status;
                        });
                    }
                }

            });





        };

        function register() {
            $window.location = "/register.html";
        }

        function testDB($http) {
            var self = this;

            $http.get('http://localhost:53239/api/seating').then(function (response) {
                self.cinemahalls = response.data;
            });
        }
    }



})();