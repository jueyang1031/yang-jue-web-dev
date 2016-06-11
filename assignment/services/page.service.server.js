/**
 * Created by yangjue on 6/1/16.
 */
module.exports = function (app, models) {

    var pageModel = models.pageModel;

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        var newPage = req.body;
        var websiteId = req.params.websiteId;
        pageModel
            .createPage(websiteId, newPage)
            .then(function (page) {
                res.json(page);
            },
            function (error) {
                res.sendStatus(404);
            });
    }
    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.json(pages);
            },
            function (error) {
                res.sendStatus(404);
            });
    }
    function findPageById(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(function (page) {
                res.json(page);
            },
            function (error) {
                res.sendStatus(404);
            });
    }
    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;
        pageModel
            .updatePage(pageId, page)
            .then(function (stat) {
                res.sendStatus(200);
            },
            function (error) {
                res.sendStatus(404);
            });
    }
    function deletePage(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .deletePage(pageId)
            .then(function (stat) {
                res.sendStatus(200);
            },
            function (error) {
                res.sendStatus(404);
            });
    }
};