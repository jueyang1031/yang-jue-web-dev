/**
 * Created by yangjue on 6/2/16.
 */
module.exports = function (app, models) {

    var widgetModel = models.widgetModel;

    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../../public/uploads'});

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/api/website/:websiteId/page/:pageId/widget", updateWidgets);

    function updateWidgets(req, res) {
        var websiteId = req.params.websiteId;
        var pageId = req.params.pageId;
        var startIndex = req.query.startIndex;
        var endIndex = req.query.endIndex;

        if (startIndex && endIndex) {
            widgets.splice(endIndex, 0, widgets.splice(startIndex, 1)[0]); //splice() method returns the removed item(s).
        }
    }

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        widgetModel
            .createWidget(pageId, widget)
            .then(function (widget) {
                res.json(widget);
            },
            function (error) {
                res.sendStatus(404);
            });
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.json(widgets);
            },
            function (error) {
                res.sendStatus(404);
            });
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            },
            function (error) {
                res.sendStatus(404);
            });
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var newWidget = req.body;
        widgetModel
            .updateWidget(widgetId, newWidget)
            .then(function (stat) {
                res.sendStatus(200);
            },
            function (error) {
                res.sendStatus(404);
            });
        //
        // for (var i in widgets) {
        //     if (widgetId === widgets[i]._id) {
        //         switch (newWidget.widgetType) {
        //             case "HTML":
        //             {
        //                 widgets[i].text = newWidget.text;
        //                 widgets[i].size = newWidget.size;
        //                 break;
        //             }
        //             case "HEADER":
        //             {
        //                 widgets[i].text = newWidget.text;
        //                 widgets[i].size = newWidget.size;
        //                 if (widgets[i].size == null) {
        //                     widgets[i].widgetType = "HTML";
        //                 }
        //                 break;
        //             }
        //             case "IMAGE":
        //             {
        //                 if (newWidget.width)
        //                     widgets[i].width = newWidget.width;
        //                 widgets[i].url = newWidget.url;
        //                 break;
        //             }
        //             case "YOUTUBE":
        //             {
        //                 widgets[i].width = newWidget.width
        //                 widgets[i].url = newWidget.url;
        //                 break;
        //             }
        //         }
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send(400);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .deleteWidget(widgetId)
            .then(function (stat) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                });
    }

    function uploadImage(req, res) {

        var widgetId = req.body.widgetId;
        var name = req.body.name;
        var text = req.body.text;
        var width = req.body.width;
        var myFile = req.file;
        var uid = req.body.uid;
        var wid = req.body.wid;
        var pid = req.body.pid;

        if (myFile) {

            var originalname = myFile.originalname; // file name on user's computer
            var filename = myFile.filename;     // new file name in upload folder
            var path = myFile.path;         // full path of uploaded file
            var destination = myFile.destination;  // folder where file is saved to
            var size = myFile.size;
            var mimetype = myFile.mimetype;

            var widget = {
                "name": name,
                "text": text,
                "width": width,
                "url": "/uploads/" + filename
            };
            widgetModel
                .updateWidget(widgetId, widget)
                .then(function (stat) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                });


        }

        res.redirect("/assignment/#/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget/" + widgetId);
    }

};