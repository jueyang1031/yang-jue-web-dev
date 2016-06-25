/**
 * Created by yangjue on 6/20/16.
 */
(function () {
    angular
        .module("FoodTracker")
        .controller("FoodSearchController", FoodSearchController);

    function FoodSearchController($location, UserService, $rootScope, SpoonacularService, FoodessentialsService, $sce) {
        var vm = this;

        vm.user = $rootScope.currentUser;
        vm.logout = logout;
        vm.searchProducts = searchProducts;
        vm.jumpToProduct = jumpToProduct;
        vm.getSafeHtml = getSafeHtml;
        vm.hideSearch = hideSearch;
        vm.offset = 0;

        vm.food = food;

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

        function getSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function jumpToProduct(id) {
            SpoonacularService
                .jumpToProduct(id)
                .then(function (response) {
                    vm.productDetail = response.data;
                    $('.modal').show();
                },
                function (error) {
                    
                });
        }
        
        function searchProducts(offset, searchText, start) {
            vm.offset = offset;
            if (start === 0)
                vm.offset = 0;
            var offsetString = vm.offset + "";
            SpoonacularService
                .searchProducts(offsetString, searchText)
                .then(function(response) {
                    var data = response.data.products;
                    vm.totalProducts = response.data.totalProducts;
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

        function hideSearch() {
            $(".modal").hide();
        }
        
        function food() {
            FoodessentialsService
                .createSession()
                .then(function (response) {
                     vm.data = response.data;
                    
                })
        }
    }
})();