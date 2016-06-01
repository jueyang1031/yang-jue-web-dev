/**
 * Created by yangjue on 6/1/16.
 */
module.exports = function (app) {

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);
    
    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        for(var i in websites) {
            if (websiteId === websites[i]._id) {
                res.json(websites[i]);
                return;
            }
        }
        res.send(400);
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        for (var i in websites) {
            if (websiteId === websites[i]._id) {
                websites.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var website = req.body;
        for (var i in websites) {
            if (websiteId === websites[i]._id) {
                websites[i].name = website.name;
                websites[i].description = website.description;
                res.send(200);
                return;
            }

        }
        res.send(400);
    }

    function createWebsite(req, res) {
        var userId = req.params.userId;
        var website = req.body;
        var newWebsite = {
            _id: (new Date()).getTime() + "",
            name: website.name,
            description: website.description,
            developerId: userId
        };
        websites.push(newWebsite);
        res.json(newWebsite);
        return;
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        var websiteByUser = [];
        for (var i in websites) {
            if (userId === websites[i].developerId)
                websiteByUser.push(websites[i]);
        }
        res.json(websiteByUser);
        return;
    }
}