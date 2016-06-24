/**
 * Created by yangjue on 6/9/16.
 */
module.exports = function () {

    var mongoose = require("mongoose");

    var MealPlanSchema = require("./mealPlan.schema.server.js")();
    var MealPlan = mongoose.model("MealPlan", MealPlanSchema);

    var api = {
        createMealPlanForUser: createMealPlanForUser,
        findAllMealPlansForUser: findAllMealPlansForUser,
        findMealPlanById: findMealPlanById,
        updateMealPlan: updateMealPlan,
        deleteMealPlan: deleteMealPlan,
        findAllMealPlans: findAllMealPlans,
        deleteMealPlanByUserId: deleteMealPlanByUserId
    };
    return api;
    
    function deleteMealPlanByUserId(userId) {
        return MealPlan.remove({"_user": userId});
    }
    
    function findAllMealPlans(userId) {
        return MealPlan.find({"_user": {$ne: userId}})
            .populate('_user')
            .exec();
    }

    function createMealPlanForUser(mealPlan) {
        return MealPlan.create(mealPlan);
    }

    function findAllMealPlansForUser(userId) {
        return MealPlan.find({_user: userId});
    }

    function findMealPlanById(mealPlanId) {
        return MealPlan.findById(mealPlanId);
    }
    
    function updateMealPlan(mealPlanId, mealPlan) {
        delete mealPlan._id;
        return MealPlan.update({_id: mealPlanId},{
            $set: mealPlan
        })
    }
    
    function deleteMealPlan(mealPlanId) {
        return MealPlan.remove({_id: mealPlanId});
    }

};