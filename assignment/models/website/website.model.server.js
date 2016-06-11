/**
 * Created by yangjue on 6/9/16.
 */
module.exports = function () {

    var mongoose = require("mongoose");

    var WebsiteSchema = require("./website.schema.server")();
    var Website = mongoose.model("Website", WebsiteSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };
    return api;

    function createWebsiteForUser(userId, website) {

    }

    function findAllWebsitesForUser(userId) {

    }

    function findWebsiteById(websiteId) {

    }
    
    function updateWebsite(websiteId, website) {
        
    }
    
    function deleteWebsite(websiteId) {
        
    }

};