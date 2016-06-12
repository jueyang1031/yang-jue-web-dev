/**
 * Created by yangjue on 5/28/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);
    
    function PageEditController($routeParams, $location, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.pid = $routeParams.pid;
        vm.wid = $routeParams.wid;
        vm.updatePage = updatePage
        vm.deletePage = deletePage;

        function init(){
            PageService
                .findPageById(vm.pid)
                .then (function (respoonse) {
                    vm.page = respoonse.data;
                });
        }
        init();
        
        function deletePage(pageId) {
            PageService
                .deletePage(pageId)
                .then(function (response) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
                },
                function (error) {
                    vm.error = "Unable to delete page";
                });
        }

        function updatePage(newPage) {
            if (!newPage.name) {
                vm.error = "name cannot be empty";
                return;
            }
            PageService
                .updatePage(vm.pid, newPage)
                .then(function (response) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
                }, 
                function (error) {
                    vm.error = "Unable to update page";
                });
        }
    }
})();