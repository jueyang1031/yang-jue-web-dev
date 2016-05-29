/**
 * Created by yangjue on 5/28/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, $location, PageService) {
        var vm = this;
        vm.wid = $routeParams.wid;
        vm.uid = $routeParams.uid;
        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.wid);
        }
        init();

    }
})();