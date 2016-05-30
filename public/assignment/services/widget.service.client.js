/**
 * Created by yangjue on 5/28/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ]

    function WidgetService() {
        var api = {
            findWidgetsByPageId: findWidgetsByPageId,
            createWidget: createWidget,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget

        };
        return api;
        
        function deleteWidget(widgetId) {
            for (var i in widgets) {
                if (widgetId === widgets[i]._id) {
                    widgets.splice(i, 1);
                    return true;
                }
            }
            return false;
        }
        
        function updateWidget(widgetId, newWidget) {
            for (var i in widgets) {
                if (widgetId === widgets[i]._id) {
                    switch (newWidget.widgetType) {
                        case "HEADER": {
                            widgets[i].text = newWidget.text;
                            widgets[i].size = newWidget.size;
                            break;
                        }
                        case "IMAGE": {
                            widgets[i].width = newWidget.width;
                            widgets[i].url = newWidget.url;
                            break;
                        }
                        case "HTML": {
                            widgets[i].text = newWidget.text
                            widgets[i].url = newWidget.url;
                            break;
                        }
                        case "YOUTUBE": {
                            widgets[i].width = newWidget.width
                            widgets[i].url = newWidget.url;
                            break;
                        }
                    }
                    return true;
                }
            }
            return false;
        }
        
        function findWidgetById(widgetId) {
            for (var i in widgets) {
                if (widgetId === widgets[i]._id) {
                    return widgets[i];
                }
            }
            return null;
        }
        
        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            widgets.push(widget);
            return widget;
        }
        
        function findWidgetsByPageId(pageId) {
            var resultSet = [];
            for (var i in widgets) {
                if (pageId === widgets[i].pageId) {
                    resultSet.push(widgets[i]);
                }
            }
            return resultSet;
        }

    }
})();