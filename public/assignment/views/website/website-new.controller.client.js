/**
 * Created by yangjue on 5/28/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);
    
    function WebsiteNewController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.createWebsite = createWebsite;

        function createWebsite(name, description) {
            if (!name){
                vm.error = "name cannot be empty";
                return;
            }
            var website = {
                name : name,
                description: description
            };

            WebsiteService
                .createWebsite(vm.uid, website)
                .then(function (response) {
                    $location.url("/user/" + vm.uid + "/website");
                },
                function (error) {
                    vm.error = "Unable to create website";
                });
            //
            // var newWebsite = WebsiteService.createWebsite(vm.uid, website);
            // if (newWebsite)
            //     $location.url("/user/" + vm.uid + "/website");
            // else vm.error = "Unable to create website";
        }

    }
})();