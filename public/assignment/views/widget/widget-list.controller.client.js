/**
 * Created by yangjue on 5/28/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);
    
    function WidgetListController($routeParams, $location, WidgetService, $sce) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;

        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pid)
                .then(function (response) {
                    vm.widgets = response.data;
                },
                function (error) {
                    vm.error = "Unable to find widgets";
                });
        }
        init();
        
        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }
        
        function getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }
    }
})();