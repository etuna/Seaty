(function () {

    'use strict';

    angular
        .module('HomeModule')
        .controller('SeatsController', SeatsController);



    SeatsController.$inject = ['$rootScope', '$scope', '$window', '$http', '$modal']
    function SeatsController($rootScope, $scope, $window, $http,$modal) {

        $scope.seats = [];

        $scope.user = {

            visitorID: "",
            name: "",
            surname: "a"

        };

        $rootScope.muser = {

            visitorID: "",
            name: "",
            surname:""

        };

        $scope.order = {

            orderID: "",
            visitorID: "",
            sectionID: "",
            seatID: ""

        };

        $scope.getSeats = function () {

            $window.alert($rootScope.sectionID + "");
           $http.get('http://localhost:54905/api/seats/' + $rootScope.sectionID).then(HandleSuccess, HandleError("Error occured"));

        }
        function HandleSuccess(res) {

            debugger;
            $scope.seats = res.data;
            return res.data;

        }

        function HandleError(ermessage) {
            return function () {
                return { success: false, message: ermessage };
            };
        }


        $scope.canNotProceed = function () {

            $window.alert("The seat is full!");
        }

        $scope.proceed = function (seatID) {

        }






        $scope.openModal = function (id,SSeatID) {
            $modal.open({
                templateUrl: id == 0 ?'myModalContent.html' : 'refuseContent.html', // loads the template
                backdrop: true, // setting backdrop allows us to close the modal window on clicking outside the modal window
                windowClass: 'modal', // windowClass - additional CSS class(es) to be added to a modal window template
                controller: function ($window, $scope, $modalInstance, $log,$route) {

                    $scope.user = {

                        visitorID: "",
                        name: "",
                        surname: "b"
                    };

                    $scope.order = {};
                   
                   
                    $scope.submit = function () {
                        //setVisitor();
                        $rootScope.muser.name = $scope.user.name;
                        $rootScope.muser.surname = $scope.user.surname;
                        $rootScope.muser.visitorID = $scope.user.name + $scope.user.surname;
                        $window.alert($rootScope.muser.name + " - " + $rootScope.muser.surname);
                        //$log.log('Submiting user info.'); // kinda console logs this statement
                        //$log.log(user);
                        $http({
                            method: 'POST',
                            url: 'http://localhost:54905/api/visitor',
                            headers: {
                                "Content-type": 'application/json'
                            },
                            dataType:'json',
                            data: $rootScope.muser
                        }).then(function (response) {
                            //console.log(response);
                            $modalInstance.dismiss('cancel');
                            $scope.order.orderID = $rootScope.muser.visitorID;
                            $scope.order.visitorID = $rootScope.muser.visitorID;
                            $scope.order.sectionID = $rootScope.sectionID;
                            $scope.order.seatID = SSeatID;
                            $http({
                                method: 'POST',
                                url: 'http://localhost:54905/api/order',
                                headers: {
                                    "Content-type": 'application/json'
                                },
                                data: $scope.order
                            })


                            $route.reload();

                        }, function (response) {
                            console.log('i am in error');
                            $modalInstance.dismiss('cancel');
                           
                        });
                        //$modalInstance.dismiss('cancel'); // dismiss(reason) - a method that can be used to dismiss a modal, passing a reason
                    }
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                resolve: {
                    user: function () {
                        return $scope.user;
                    }
                }
            });//end of modal.open
        }; // end of scope.open function






 function setVisitor() {


        $rootScope.muser.visitorID = $scope.user.name+ $scope.user.surname;
        $rootScope.muser.name = $scope.user.name;
        $rootScope.muser.surname = $scope.user.surname;


    }

    }
    
    

})();