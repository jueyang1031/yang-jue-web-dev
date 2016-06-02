/**
 * Created by yangjue on 5/28/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
        var api = {
            findPageByWebsiteId: findPageByWebsiteId,
            createPage: createPage,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function deletePage(pageId) {
            var url = "/api/page/" + pageId;
            return $http.delete(url);
        }
        
        function updatePage(pageId, page) {
            var url = "/api/page/" + pageId;
            return $http.put(url, page);
        }
        
        function findPageById(pageId) {
            var url = "/api/page/" + pageId;
            return $http.get(url);
        }
        
        function createPage(websiteId, newPage) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.post(url, newPage);
        }
        
        function findPageByWebsiteId(websiteId) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url);
        }

    }
})();