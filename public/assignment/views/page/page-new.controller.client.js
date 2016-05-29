/**
 * Created by yangjue on 5/28/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, $location, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.createPage = createPage;

        function createPage(name, title) {
            var newPage = {
                name: name,
                description: title
            }
            if (PageService.createPage($routeParams.wid, newPage))
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
            else vm.error = "Unable to create page";
        }
    }
})();