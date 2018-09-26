// JavaScript source code
(function () {

    'use strict';

    angular.module('RegisterModule').controller('RegisterController', RegisterController);



    function RegisterController($location, $window, $scope) {
        
        $scope.register = register;
        $scope.cancel = cancel;


        $scope.registerModel = {
            name : "",
            username: "",
            password: "",
            error: ""
        };
        

        function register() {

            $window.alert($scope.registerModel.username + " " + $scope.registerModel.password);
            $window.alert(btoa($scope.registerModel.username + ':' + $scope.registerModel.password));
            
            $.ajax({

                type: 'GET',
                url: 'http://localhost:54905/api/seating',
                headers: {
                    'Authorization': 'Basic ' + btoa($scope.registerModel.username + ':' + $scope.registerModel.password)
                },
                dataType: 'json',
                success: function () {
                    $scope.$apply(function () {
                        $window.alert('OKAY!');
                    });
                    //$window.alert('OKAY!');
                },
                complete: function (jqXHR) {
                    if (jqXHR.status == 200) {
                        $scope.$apply(function () {
                            $scope.registerModel.error = "Info is not valid for registration.";
                            return;
                        });

                    } else {
                        $window.alert('error1!' + jqXHR.status);
                        var newUser = {
                            username: $scope.registerModel.username,
                            password: $scope.registerModel.password
                        }
                        $window.alert($scope.registerModel.username + " usernmandpass  " + $scope.registerModel.password);
                        $.ajax({

                            type: 'POST',
                            url: 'http://localhost:54905/api/seating',
                            dataType: 'json',
                            data: newUser,
                            success: function () {
                                $scope.$apply(function () {


                                    $scope.registerModel.error = "SUCCESS!";

                                    $window.location = '/index.html';
                                });
                                //$window.alert('OKAY!');
                            },
                            complete: function (jqXHR) {
                                if (jqXHR.status != 200) {
                                    $scope.$apply(function () {
                                        $scope.registerModel.error = "Username or Password is not valid";
                                        $window.alert('error2!' + jqXHR.status);
                                    });

                                }
                            }

                        });

                    }
                }

            });














        }

        function cancel() {
            $window.location = "/index.html";
        }

        function te() {

            $.ajax({

                type: 'GET',
                url: 'http://localhost:53239/api/seating',
                headers: {
                    'Authorization': 'Basic ' + btoa($scope.registerModel.username + ':' + $scope.registerModel.password)
                },
                dataType: 'json',
                success: function () {
                    $scope.$apply(function () {
                        $window.alert('OKAY!');
                    });
                    //$window.alert('OKAY!');
                },
                complete: function (jqXHR) {
                    if (jqXHR.status == 200) {
                        $scope.$apply(function () {
                            $scope.registerModel.error = "Info is not valid for registration.";
                            return;
                        });

                    } else {
                        $window.alert('error1!' + jqXHR.status);
                        var newUser = {
                            username: $scope.registerModel.username,
                            password: $scope.registerModel.password
                        }
                        $.ajax({

                            type: 'POST',
                            url: 'http://localhost:53239/api/seating',
                            dataType: 'json',
                            data: JSON.stringify(newUser),
                            success: function () {
                                $scope.$apply(function () {


                                    $scope.registerModel.error = "SUCCESS!";

                                    $window.location = '/index.html';
                                });
                                //$window.alert('OKAY!');
                            },
                            complete: function (jqXHR) {
                                if (jqXHR.status != 200) {
                                    $scope.$apply(function () {
                                        $scope.registerModel.error = "Username or Password is not valid";
                                        $window.alert('error2!' + jqXHR.status);
                                    });

                                }
                            }

                        });

                    }
                }

            });

        }
    }



})();


