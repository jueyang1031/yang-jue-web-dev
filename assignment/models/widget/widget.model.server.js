/**
 * Created by yangjue on 6/11/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server.js")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    };
    return api;

    function createWidget(pageId, widget) {
        widget._page = pageId;
        return Widget
            .find({_page: pageId})
            .then(function (widgets) {
                var maxOrder = -1;
                if (widgets.length > 0) {
                    for (var j = 0; j < widgets.length; ++j) {
                        if (widgets[j].order > maxOrder)
                            maxOrder = widgets[j].order;
                    }
                }
                widget.order = maxOrder + 1;
                return Widget.create(widget);
            });
    }

    function findAllWidgetsForPage(pageId) {
        return Widget.find({_page: pageId});
    }
    
    function findWidgetById(widgetId) {
        return Widget.findById(widgetId);
    }
    
    function updateWidget(widgetId, widget) {
        delete widget._id;
        return Widget.update({_id: widgetId}, {
            $set: widget
        });
    }
    
    function deleteWidget(widgetId) {
        return Widget
            .findById(widgetId)
            .then(function (widget) {
               return Widget
                   .find({ $and: [{_page: widget._page}, {order: {$gt: widget.order} }]})
                   .then(function (widgets) {
                       widgets.forEach(function (w) {
                           w.order--;
                           w.save(function(err,doc){});
                       });
                       return Widget.remove({_id: widgetId});
                   },
                   function (error) {

                   });
            },
            function (error) {
                
            });

    }
    
    function reorderWidget(pageId, start, end) {
        var startIndex = parseInt(start);
        var endIndex = parseInt(end);
        return Widget
            .find({_page: pageId})
            .then(function (widgets) {
                widgets.forEach(function(widget) {
                    if(startIndex < endIndex) {
                        if(widget.order < startIndex) {

                        } else if(widget.order === startIndex) {
                            widget.order = endIndex;
                            widget.save(function(err,doc){});
                        } else if(widget.order > startIndex && widget.order <= endIndex) {
                            widget.order--;
                            widget.save(function(err,doc){});
                        } else if(widget.order > endIndex) {

                        }
                    } else {
                        if(widget.order < endIndex) {

                        } else if(widget.order === startIndex) {
                            widget.order = endIndex;
                            widget.save(function(err,doc){});
                        } else if(widget.order < startIndex && widget.order >= endIndex) {
                            widget.order++;
                            widget.save(function(err,doc){});
                        } else if(widget.order > startIndex) {

                        }
                    }
                })

            });

    }
};