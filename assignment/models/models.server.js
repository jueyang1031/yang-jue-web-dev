/**
 * Created by yangjue on 6/9/16.
 */
module.exports = function () {

    var mongoose = require("mongoose");
    mongoose.connect("mongodb://localhost/webAppMaker");

    var models = {
        userModel: require("./user/user.model.server.js")(),
        websiteModel: require("./website/website.model.server.js")()
    };
    return models;
};