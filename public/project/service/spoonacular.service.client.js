/**
 * Created by yangjue on 6/4/16.
 */
(function () {
    angular
        .module("FoodTracker")
        .factory("SpoonacularService", SpoonacularService);
    
    function SpoonacularService($http) {
        var key = "6pcjkTrnm2mshqQtPok9XmUwPqJGp1FUHZIjsnlJa5gy7ecCZt";
        var headerName = "X-Mashape-Key";
        var urlBase = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/products/search?number=NUMBER&offset=OFFSET&query=TEXT";
        var getProductUrlBase = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/products/";

        var api = {
            searchProducts : searchProducts,
            jumpToProduct: jumpToProduct
        };
        return api;
        
        function jumpToProduct(id) {
            var url = getProductUrlBase + id;
            return $http.get(url, {
                headers: {'X-Mashape-Key': key}
            });
        }
        
        function searchProducts(offset, searchText) {
            var url = urlBase.replace("NUMBER", "30").replace("OFFSET", offset).replace("TEXT", searchText);
            return $http.get(url, {
                headers: {'X-Mashape-Key': key}
            });
        }
    }
})();