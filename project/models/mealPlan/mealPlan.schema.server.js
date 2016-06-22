/**
 * Created by yangjue on 6/9/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.ObjectId, ref: "User"},
        date: Date,
        title: String,
        description: String,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.mealPlan"});

    return UserSchema;
};