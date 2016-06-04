/**
 * Created by yangjue on 6/4/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);
    
    function FlickrService($http) {
        var key = "ef3d17f87bb3ff286ea0f671d565ddb3";
        var secret = "b37cc75c48d1883a";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search" +
            "&format=json&api_key=API_KEY&text=TEXT";

        var api = {
            searchPhotos : searchPhotos
        };
        return api;
        
        function searchPhotos(searchText) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchText);
            return $http.get(url);
        }
    }
})();