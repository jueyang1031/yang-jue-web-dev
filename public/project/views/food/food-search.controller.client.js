/**
 * Created by yangjue on 6/20/16.
 */
(function () {
    angular
        .module("FoodTracker")
        .controller("FoodSearchController", FoodSearchController);

    function FoodSearchController($location, UserService, $rootScope, SpoonacularService, $sce) {
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

        function jumpToProduct(id, type) {
            SpoonacularService
                .jumpToProduct(id, type)
                .then(function (response) {
                    vm.productDetail = response.data;
                    if (type == "recipe") {
                        var images = [];
                        images.push(vm.productDetail.image);
                        vm.productDetail.images = images;
                    }
                    $('.modal').show();
                },
                function (error) {
                    
                });
        }
        
        function searchProducts(offset, searchText, start, type) {
            vm.offset = offset;
            if (start === 0)
                vm.offset = 0;
            var offsetString = vm.offset + "";
            SpoonacularService
                .searchProducts(offsetString, searchText, type)
                .then(function(response) {
                    if (type == "product") {
                        var data = response.data.products;
                        vm.totalProducts = response.data.totalProducts;
                        vm.productList = data;
                    } else if (type == "recipe") {
                        vm.productList = [];
                        var results = response.data.results;
                        vm.totalProducts = response.data.totalResults;
                        var baseUri = response.data.baseUri;
                        for (var i = 0; i < results.length; ++i) {
                            var recipe = results[i];
                            recipe.image = baseUri + recipe.image;
                            vm.productList.push(recipe);
                        }
                    }
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