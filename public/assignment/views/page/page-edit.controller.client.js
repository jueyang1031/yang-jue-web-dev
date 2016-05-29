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
            vm.page = PageService.findPageById(vm.pid);
        }
        init();
        
        function deletePage(pageId) {
            if (PageService.deletePage(pageId)) {
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
            }else vm.error = "Unable to delete page";
        }

        function updatePage(newPage) {
            if (PageService.updatePage(vm.pid, newPage)) {
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
            } else vm.error = "Unable to update page";
        }
    }
})();