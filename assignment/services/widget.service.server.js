/**
 * Created by yangjue on 6/2/16.
 */
module.exports = function (app, model) {

    var widgets = [
        {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"
        },
        {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E"
        },
        {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

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
        widget.pageId = pageId;
        widgets.push(widget);
        res.json(widget);
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        var resultSet = [];
        for (var i in widgets) {
            if (pageId === widgets[i].pageId) {
                resultSet.push(widgets[i]);
            }
        }
        res.json(resultSet);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        for (var i in widgets) {
            if (widgetId === widgets[i]._id) {
                res.json(widgets[i]);
                return;
            }
        }
        res.send(400);
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var newWidget = req.body;
        for (var i in widgets) {
            if (widgetId === widgets[i]._id) {
                switch (newWidget.widgetType) {
                    case "HTML":
                    {
                        widgets[i].text = newWidget.text;
                        widgets[i].size = newWidget.size;
                        break;
                    }
                    case "HEADER":
                    {
                        widgets[i].text = newWidget.text;
                        widgets[i].size = newWidget.size;
                        if (widgets[i].size == null) {
                            widgets[i].widgetType = "HTML";
                        }
                        break;
                    }
                    case "IMAGE":
                    {
                        if (newWidget.width)
                            widgets[i].width = newWidget.width;
                        widgets[i].url = newWidget.url;
                        break;
                    }
                    case "YOUTUBE":
                    {
                        widgets[i].width = newWidget.width
                        widgets[i].url = newWidget.url;
                        break;
                    }
                }
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for (var i in widgets) {
            if (widgetId === widgets[i]._id) {
                widgets.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function uploadImage(req, res) {

        var widgetId = req.body.widgetId;
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

            for (var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    widgets[i].url = "/uploads/" + filename;
                    widgets[i].width = width;
                }
            }
        }

        res.redirect("/assignment/#/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget/" + widgetId);
    }

};