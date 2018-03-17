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
        vm.isEdit14 = false;
        vm.isEdit15 = false;
        vm.isEdit17 = false;
        vm.isEdit19 = false;
        vm.isEdit20 = false;
        vm.message  = null;
        vm.accounts = [];
        vm.projects = [];
        vm.resources = [];
        // DEV03 - Adding drop down list for L1,L2 completion modes
        vm.l1cmList = ["Project level Classroom","Wipro level Classroom","Web-ex","ITMS","Udemy","TrendNxt-L1"];
        vm.l2cmList = ["ITMS Advanced course linked with case study","Udemy Advanced course linked with case study","TrendNxt-L2",
                        "Top Gear case study","Project level case study"];
        vm.loadProjects = loadProjects;
        vm.loadResources = loadResources;
        vm.searchByEmpId  = searchByEmpId;
        vm.processEdit  = processEdit;
        
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
                .then(function (resources) {
                    if(resources.success) vm.accounts = resources.holder;
                    else vm.message = resources.holder;
                });
        }

        function loadProjects(accountId){
            UserService.getProjects(accountId)
                .then(function(resources){
                    if(resources.success) vm.projects = resources.holder;
                    else vm.message = resources.holder;
                });
        }

        function loadResources(accountId,projectId){
            UserService.getResources(accountId,projectId)
                .then(function(resources){
                    if(resources.success) vm.resources = resources.holder;
                    else vm.message = resources.holder;
                });
        }

        function searchByEmpId(empId){
            UserService.getResourcesByEmpId(empId)
                .then(function(resources){
                    if(resources.success) vm.resources = resources.holder;
                    else vm.message = resources.holder;
                });
        }

        function processEdit(empId,wbscode,field,value,fieldFlag){
            // Dynamically create,assign variable to the $scope
            var getter = $parse(fieldFlag);
            var setter = getter.assign;
            if(getter(vm) == false){
                setter(vm,true);
            }else {
                UserService.updateValues(empId,wbscode,field,value)
                    .then(function(resources){
                        if(resources.success){
                            setter(vm,false);
                            vm.message  = "Data updated successfully !!";
                        }else{
                           vm.message  = resources.holder; 
                        }
                    });
            }
            
        }

       
    }

})();