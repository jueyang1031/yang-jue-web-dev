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
            vm.website = WebsiteService.findWebsiteById(websiteId);
        }
        init();

        function deleteWebsite(websiteId) {
            if (WebsiteService.deleteWebsite(websiteId))
                $location.url("/user/" + vm.uid + "/website");
            else vm.error = "Unable to delete website."
        }

        function updateWebsite(newWebsite) {

            if (WebsiteService.updateWebsite(websiteId, newWebsite))
                $location.url("/user/" + vm.uid + "/website");
            else vm.error = "Unable to update website."
        }

    }
})();