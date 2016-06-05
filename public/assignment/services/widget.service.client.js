/**
 * Created by yangjue on 5/28/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {
        var api = {
            findWidgetsByPageId: findWidgetsByPageId,
            createWidget: createWidget,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            sortWidget: sortWidget

        };
        return api;
        
        function deleteWidget(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.delete(url);
        }
        
        function updateWidget(widgetId, newWidget) {
            var url = "/api/widget/" + widgetId;
            return $http.put(url, newWidget);
        }
        
        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.get(url);
        }
        
        function createWidget(pageId, widget) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.post(url, widget);
        }
        
        function findWidgetsByPageId(pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url);
        }


        function sortWidget(websiteId, pageId, startIndex, endIndex) {
            return $http.put("/api/website/"+websiteId+"/page/"+pageId+"/widget?startIndex="+startIndex+"&endIndex="+endIndex);
        }

    }
})();