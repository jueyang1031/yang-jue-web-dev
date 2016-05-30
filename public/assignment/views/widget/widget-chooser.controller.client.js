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
                _id: (new Date()).getTime() + "",
                widgetType: widgetType
            };
            vm.widget = WidgetService.createWidget(vm.pid, widget);
            if (vm.widget) {
                $location.url
                ("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + widget._id);
            }
        }
    }
})();