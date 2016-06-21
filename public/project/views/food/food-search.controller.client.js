/**
 * Created by yangjue on 6/20/16.
 */
(function () {
    angular
        .module("FoodTracker")
        .controller("FoodSearchController", FoodSearchController);

    function FoodSearchController($location, UserService, $rootScope, SpoonacularService) {
        var vm = this;

        vm.user = $rootScope.currentUser;
        vm.logout = logout;
        vm.searchProducts = searchProducts;
        vm.jumpToProduct = jumpToProduct;
        vm.offset = 0;

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

        }

        init();

        function jumpToProduct(id) {
            SpoonacularService
                .jumpToProduct(id)
                .then(function (response) {
                    vm.productDetail = response.data;
                })
        }
        
        function searchProducts(offset, searchText) {
            vm.offset = offset;
            var offsetString = vm.offset + "";
            SpoonacularService
                .searchProducts(offsetString, searchText)
                .then(function(response) {
                    var data = response.data.products;
                    vm.totalProducts = response.data.totalProducts;
                    // data = data.substring(0,data.length - 1);
                    console.log(data);
                    // data = JSON.parse(data);
                    vm.productList = data;
                });
        }

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