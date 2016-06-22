/**
 * Created by yangjue on 5/31/16.
 */

module.exports = function (app, models) {

    var mealPlanModel = models.mealPlanModel;
    var userModel = models.userModel;

    app.post("/api/ft/user/:userId/mealPlan", createMealPlan);
    app.get("/api/ft/mealPlan/:mealPlanId", findMealPlanById);
    app.put("/api/ft/mealPlan/:mealPlanId", updateMealPlan);
    app.delete("/api/ft/mealPlan/:mealPlanId", deleteMealPlan);
    
    function deleteMealPlan(req, res) {
        var id = req.params.mealPlanId;
        mealPlanModel
            .deleteMealPlan(id)
            .then(function (response) {
                res.sendStatus(200);
            },
            function (error) {
                res.status(400).send("Cannot delete meal plan");
            });
    }
    
    function updateMealPlan(req, res) {
        var id = req.params.mealPlanId;
        var mealPlan = req.body;
        mealPlanModel
            .updateMealPlan(id, mealPlan)
            .then(function (response) {
                res.sendStatus(200);
            },
            function (error) {
                res.status(400).send("Cannot update meal plan");
            });
    }

    function findMealPlanById(req, res) {
        var id = req.params.mealPlanId;
        mealPlanModel
            .findMealPlanById(id)
            .then(function (mealPlan) {
                res.json(mealPlan);
            },
            function (error) {
                res.status(404).send("Cannot find meal plan");
            });
    }

    function createMealPlan(req, res) {
        var userId = req.params.userId;
        var mealPlan = req.body;
        mealPlan._user = userId;
        mealPlanModel
            .createMealPlanForUser(mealPlan)
            .then(function (mealPlan) {
                if (mealPlan)
                    return userModel.pushMealPlan(userId, mealPlan);
                else
                    res.status(400).send("Cannot create meal plan.");

            }, function (error) {
                res.status(400).send("Cannot create meal plan.");
            })
            .then(function (response) {
                res.json(mealPlan);
            },
            function (error) {
                res.status(400).send("Cannot create meal plan.");
            });
    }
};