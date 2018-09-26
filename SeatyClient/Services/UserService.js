(function () {

    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];

    function UserService($http) {

        var service = {};

        service.getAll = getAll;
        service.getByID = getByID;
        service.getByUsername = getByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;


        return service;
    }



    function getAll() {
        return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
    }

    function getByID(ID) {
        return $http.get('/api/users/' + ID).then(handleSuccess, handleError('Error getting user with ID ' + ID));
    }

    function getByUsername(username) {
        return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user with username ' + username));
    }

    function Create(user) {
        return $http.post('/api/users', user).then(handleSuccess, handleError('Error creating user'));
    }

    function Update(user) {
        return $http.put('/api/users/' + user.ID, user).then(handleSuccess, handleError('Error updating the user'));
    }

    function Delete(user) {
        return $http.delete('/api/users/' + user.ID).then(handleSuccess, handleError('Error deleting user'));
    }

    function handleSuccess(res) {
        return res.data;
    }

    function handleError(error) {
        return function () {
            return { success: false, message: error };
        };
    }





});