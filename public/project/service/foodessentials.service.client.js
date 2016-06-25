/**
 * Created by yangjue on 6/4/16.
 */
(function () {
    angular
        .module("FoodTracker")
        .factory("FoodessentialsService", FoodessentialsService);
    
    function FoodessentialsService($http) {
        var key = "vkv7mteu7jus6vvh668h67bt";
        var dev_id = "foodU";
        var createSessionUrlBase = "http://api.foodessentials.com/createsession?uid=UID&devid=DEV_ID&appid=APP_ID&f=json&api_key=KEY";
        var searchProductUrlBase = "http://api.foodessentials.com/searchprods?q=TEXT&sid=SID&n=NUMBER&s=OFFSET&f=json&api_key=KEY";
        var getProductUrlBase = "http://api.foodessentials.com/productscore?u=UPC&sid=SID&f=json&api_key=KEY";

        var api = {
            createSession: createSession,
            searchProducts : searchProducts,
            jumpToProduct: jumpToProduct
        };
        return api;
        
        function createSession(userId) {
            var url = "https://api.foodfacts.com/ci/api/foodfacts/food_products_per_search_term?login=seaeidolon" +
                "&password=20082012@Whu&search_term=beef&per_page=10&page=1&sort_by=peg_name.sort";
            return $http.post(url);
        }
        
        function jumpToProduct(upc, sid) {
            var url = getProductUrlBase.replace("UPC", upc).replace("SID", sid);
            return $http.get(url,
                {headers:
                    {
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                        "Access-Control-Allow-Origin": "*"}});
        }
        
        function searchProducts(offset, searchText, sid) {
            var url = searchProductUrlBase
                .replace("NUMBER", "30")
                .replace("OFFSET", offset)
                .replace("TEXT", searchText)
                .replace("KEY", key)
                .replace("SID", sid);
            return $http.get(url);
        }
    }
})();