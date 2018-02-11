(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService'];
    function LoginController($location, AuthenticationService) {
        var vm = this;
        vm.status = "";
        vm.login = login;

        (function initController() {
            console.log("Clears the cookies!!");
            // reset login status
            AuthenticationService.clearCredentials();
        })();

        function login() {
            console.log("Inside LoginController login");
            vm.dataLoading = true;
            AuthenticationService.login(vm.username, vm.password, function (response) {
                console.log("Response:"+response.data);
                if (response.data== "SUCCESS") {
                    AuthenticationService.setCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                    vm.status = "Username or password incorrect";
                    vm.dataLoading = false;
                    vm.username="",vm.password="";
                }
            });
        };
    }

})();
