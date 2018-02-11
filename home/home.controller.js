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
        vm.scolrinfo = [];
        vm.scolrs1 = [];
        vm.scolrs2 = [];

        vm.loadProjects = loadProjects;
        vm.loadResources = loadResources;
        
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
                    vm.scolrinfo = ['Empid','WBS Code','PM Name','Practice'];
                    vm.scolrs1 = ['Skill1 Name','S1 L1 Training Date-Planned','S1 L1 Training Date-Actual','S1 L1 Completion Mode','S1 L2 Training Date-Planned','S1 L2 Training Date-Actual',
                            'S1 L2 Assessment Date-Planned','S1 L2 Assessment Date-Actual','S1 L2 Completion Mode'];
                    vm.scolrs2 = ['Skill2 Name','S2 L1 Training Date-Planned','S2 L1 Training Date-Actual','S2 L1 Completion Mode','S2 L2 Training Date-Planned','S1 L2 Training Date-Actual',
                            'S2 L2 Assessment Date-Planned','S2 L2 Assessment Date-Actual','S2 L2 Completion Mode'];
                });
        }

       
    }

})();