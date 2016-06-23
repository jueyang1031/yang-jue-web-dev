/**
 * Created by yangjue on 6/9/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var MealSchema = mongoose.Schema({
        _mealPlan: {type: mongoose.Schema.ObjectId, ref: "MealPlan"},
        timeSlot: String,
        title: String,
        foods: [],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.meal"});

    return MealSchema;
};