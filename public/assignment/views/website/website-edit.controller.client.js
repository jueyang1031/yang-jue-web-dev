/**
 * Created by yangjue on 5/28/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);
    
    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        var websiteId = $routeParams.wid;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        vm.uid = $routeParams.uid;
        function init(){
            WebsiteService
                .findWebsiteById(websiteId)
                .then(function (response) {
                    vm.website = response.data;
                });
        }
        init();

        function deleteWebsite(websiteId) {
            WebsiteService
                .deleteWebsite(websiteId)
                .then(function (response) {
                        $location.url("/user/" + vm.uid + "/website");
                },
                function (error) {
                    vm.error = "Unable to delete website."
                });
            //
            // if (WebsiteService.deleteWebsite(websiteId))
            //     $location.url("/user/" + vm.uid + "/website");
            // else vm.error = "Unable to delete website."
        }

        function updateWebsite(newWebsite) {
            if(!newWebsite.name) {
                vm.error = "name cannot be empty";
                return;
            }
            WebsiteService
                .updateWebsite(websiteId, newWebsite)
                .then(function (response) {
                    $location.url("/user/" + vm.uid + "/website");
                },
                function (error) {
                    vm.error = "Unable to update website."
                });

            // if (WebsiteService.updateWebsite(websiteId, newWebsite))
            //     $location.url("/user/" + vm.uid + "/website");
            // else vm.error = "Unable to update website."
        }

    }
})();