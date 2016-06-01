/**
 * Created by yangjue on 5/27/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);
    
    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        function init() {
            vm.uid = $routeParams.uid;
            WebsiteService
                .findWebsitesByUser(vm.uid)
                .then(function (response) {
                    vm.websites = response.data;
                },
                function (error) {
                    vm.error = "Unable to find websites.";
                });
            
        }
        init();
    }
})();