/**
 * Created by yangjue on 6/1/16.
 */
module.exports = function (app) {

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        var newPage = req.body;
        var websiteId = req.params.websiteId;
        newPage._id = (new Date()).getTime() + "";
        newPage.websiteId = websiteId;
        pages.push(newPage);
        res.json(newPage);
    }
    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var resultSet = [];
        for (var i in pages) {
            if (websiteId === pages[i].websiteId) {
                resultSet.push(pages[i]);
            }
        }
        res.json(resultSet);
    }
    function findPageById(req, res) {
        var pageId = req.params.pageId;
        for (var i in pages) {
            if (pageId === pages[i]._id) {
                res.json(pages[i]);
                return;
            }
        }
        res.send(400);
    }
    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;
        for (var i in pages) {
            if (pageId === pages[i]._id) {
                pages[i].name = page.name;
                pages[i].title = page.title;
                res.send(200);
                return;
            }
        }
        res.send(400);
    }
    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for (var i in pages) {
            if (pageId === pages[i]._id) {
                pages.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }
}