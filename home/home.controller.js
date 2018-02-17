(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope'];
    function HomeController(UserService, $rootScope) {
        var vm = this;

        vm.user = null;
        vm.accounts = [];
        vm.projects = [];
        vm.resources = [];
        
        vm.loadProjects = loadProjects;
        vm.loadResources = loadResources;
        vm.searchByEmpId  = searchByEmpId;
        
        initController();

        function initController() {
            loadCurrentUser();
            loadAllAccounts();
        }

        function loadCurrentUser() {
            console.log($rootScope.globals.currentUser.username);
            vm.user = $rootScope.globals.currentUser;
        }

        function loadAllAccounts() {
            console.log("loadAllAccounts");
            UserService.getAccounts()
                .then(function (accounts) {
                    vm.accounts = accounts;
                });
        }

        function loadProjects(accountId){
            UserService.getProjects(accountId)
                .then(function(projects){
                    vm.projects = projects;
                });
        }

        function loadResources(accountId,projectId){
            UserService.getResources(accountId,projectId)
                .then(function(resources){
                    vm.resources = resources;
                });
        }

        function searchByEmpId(empId){
            UserService.getResourcesByEmpId(empId)
                .then(function(resources){
                    vm.resources = resources;
                });
        }

       
    }

})();