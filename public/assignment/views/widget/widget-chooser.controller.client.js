/**
 * Created by yangjue on 5/29/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);
    
    function WidgetChooserController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.createWidget = createWidget;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        function init() {

        }
        init();

        function createWidget(widgetType) {
            var widget = {
                type: widgetType
            };
            WidgetService
                .createWidget(vm.pid, widget)
                .then(function (response) {
                    if (response.data && response.data._id) {
                        widget = response.data;
                        $location.url
                        ("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + widget._id);
                    }
                },
                function (error) {
                    vm.error = "Unable to create widget";
                });
        }
    }
})();