/**
 * Created by yangjue on 6/4/16.
 */
(function(){
    angular
        .module("wamDirectives", [])
        .directive("wamSortable", wamSortable);

    function wamSortable() {
        function link(scope, element, attrs) {
            var start = null;
            var end   = null;
            $(element)
                .sortable({
                    axis: "y",
                    sort: function(event, ui) {
                        //ui.helper.find("a").hide();
                        start = ui.item.index();
                    },
                    stop: function(event, ui) {
                        //ui.item.find("a").show();
                        end = ui.item.index();
                        if(start >= end) {
                            start--;
                        }
                        scope.wamSortableCallback({start: start, end: end});
                    }
                });
        }
        return {
            scope: {
                wamSortableCallback: '&'
            },
            link: link
        };
    }
})();