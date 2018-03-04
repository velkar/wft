(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope','$parse'];
    function HomeController(UserService, $rootScope, $parse) {
        var vm = this;

        vm.user = null;
        vm.isEdit7 = false;
        vm.isEdit8 = false;
        vm.isEdit10 = false;
        vm.isEdit12 = false;
        vm.isEdit13 = false;
        vm.accounts = [];
        vm.projects = [];
        vm.resources = [];
        
        vm.loadProjects = loadProjects;
        vm.loadResources = loadResources;
        vm.searchByEmpId  = searchByEmpId;
        vm.enableEdit  = enableEdit;
        
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

        // Dynamically create,assign variable to the $scope
        function enableEdit(obj,fieldFlag){
            //Creating variable from string
            var getter = $parse(fieldFlag);
            var setter = getter.assign;
            if(getter(vm) == false){
                setter(vm,true);
            }else{
                setter(vm,false);
                //UserService.updateValues()
            }
            
        }

       
    }

})();