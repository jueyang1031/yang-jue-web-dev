/**
 * Created by yangjue on 6/21/16.
 */
(function(){
    angular
        .module("FoodTracker")
        .factory("MealPlanService", MealPlanService);

    function MealPlanService($http) {
        var api = {
            createMealPlan: createMealPlan,
            findMealPlanById: findMealPlanById,
            updateMealPlan: updateMealPlan,
            deleteMealPlan: deleteMealPlan
        };
        return api;
        
        function deleteMealPlan(userId, mealPlanId) {
            var url = "/api/ft/user/" + userId + "/mealPlan/" + mealPlanId;
            return $http.delete(url);
        }
        
        function updateMealPlan(mealPlanId, mealPlan) {
            var url = "/api/ft/mealPlan/" + mealPlanId;
            return $http.put(url, mealPlan);
        }
        
        function findMealPlanById(mealPlanId) {
            var url = "/api/ft/mealPlan/" + mealPlanId;
            return $http.get(url);
        }
        
        function createMealPlan(userId, mealPlan) {
            var url = "/api/ft/user/" + userId + "/mealPlan";
            return $http.post(url, mealPlan);
        }

    }
})();