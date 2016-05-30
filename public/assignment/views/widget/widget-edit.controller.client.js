/**
 * Created by yangjue on 5/29/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController)
        .directive('convertToNumber', function() {
            return {
                require: 'ngModel',
                link: function(scope, element, attrs, ngModel) {
                    ngModel.$parsers.push(function(val) {
                        return parseInt(val, 10);
                    });
                    ngModel.$formatters.push(function(val) {
                        return '' + val;
                    });
                }
            };
        });
    
    function WidgetEditController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;


        function init() {
            vm.widget = WidgetService.findWidgetById(vm.wgid);
        }
        init();
        
        function deleteWidget() {
            if (WidgetService.deleteWidget(vm.wgid)) {
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
            } else vm.error = "Unable to delete widget";
        }
        
        function updateWidget(newWidget) {
            if(WidgetService.updateWidget(vm.wgid, newWidget)) {
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
            } else vm.error = "Unable to delete widget";
        }

    }
})();