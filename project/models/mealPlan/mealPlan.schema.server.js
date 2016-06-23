/**
 * Created by yangjue on 6/9/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var MealPlanSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.ObjectId, ref: "User"},
        date: Date,
        title: String,
        description: String,
        meals: [],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.mealPlan"});

    return MealPlanSchema;
};