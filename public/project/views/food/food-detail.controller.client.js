/**
 * Created by yangjue on 6/20/16.
 */
(function () {
    angular
        .module("FoodTracker")
        .controller("FoodDetailController", FoodDetailController);

    function FoodDetailController($location, UserService, $rootScope, SpoonacularService, $routeParams, $sce) {
        var vm = this;
        vm.pid =$routeParams.pid;
        vm.user = $rootScope.currentUser;
        vm.logout = logout;
        vm.jumpToProduct = jumpToProduct;
        vm.getSafeHtml = getSafeHtml;
        vm.offset = 0;

        function getSafeHtml(html) {
            console.log(html);
            return $sce.trustAsHtml(html);
        }

        function jumpToProduct() {
            SpoonacularService
                .jumpToProduct(vm.pid)
                .then(function (response) {
                    vm.productDetail = response.data;
                })
        }

        function init() {

            UserService
                .loggedIn()
                .then(function (response) {
                        var user = response.data;
                        if (user == '0') {
                            $rootScope = null;
                        } else {
                            $rootScope.currentUser = user;
                            vm.user = user;
                        }
                    },
                    function (err) {
                        $location.url("/home")
                    });
            jumpToProduct();

        }

        init();

        function logout() {
            UserService
                .logout()
                .then(function (response) {
                        $location.url("/home");
                    },
                    function (error) {
                        $location.url("/home");
                    })
        }
    }
})();