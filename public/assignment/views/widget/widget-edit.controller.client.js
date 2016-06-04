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
        vm.navigateToSearch = navigateToSearch;

        function init() {
            WidgetService
                .findWidgetById(vm.wgid)
                .then(function (response) {
                    vm.widget = response.data;
                },
                function (error) {
                    vm.error = "Unable to find widget";
                });
        }
        init();

        function navigateToSearch(newWidget) {
            WidgetService
                .updateWidget(vm.wgid, newWidget)
                .then(function (response) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + vm.wgid + "/search");
                });

        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.wgid)
                .then(function (response) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                },
                function (error) {
                    vm.error = "Unable to delete widget";
                });
        }
        
        function updateWidget(newWidget) {
            WidgetService
                .updateWidget(vm.wgid, newWidget)
                .then(function (response) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                },
                function (error) {
                    vm.error = "Unable to delete widget";
                });
        }

    }
})();