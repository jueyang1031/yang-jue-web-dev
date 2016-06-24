/**
 * Created by yangjue on 6/9/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        mealPlans: [{type: mongoose.Schema.ObjectId, ref: "MealPlan"}],
        facebook: {
            id:    String,
            token: String
        },
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        follows: [{type: mongoose.Schema.ObjectId, ref: "User"}],
        avatar: String,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.user"});

    return UserSchema;
};