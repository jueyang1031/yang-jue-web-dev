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
                title: title
            };
            PageService
                .createPage($routeParams.wid, newPage)
                .then(function (response) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
                },
                function (error) {
                    vm.error = "Unable to create page";
                });
        }
    }
})();