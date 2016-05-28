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
            vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
        }
        init();
    }
})();