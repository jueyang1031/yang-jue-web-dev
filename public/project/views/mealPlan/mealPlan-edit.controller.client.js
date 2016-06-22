/**
 * Created by yangjue on 6/21/16.
 */
(function () {
    angular
        .module("FoodTracker")
        .controller("MealPlanEditController", MealPlanEditController);

    function MealPlanEditController($location, UserService, $rootScope, $routeParams, MealPlanService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.mpid = $routeParams.mpid;
        vm.user = $rootScope.currentUser;
        vm.logout = logout;
        vm.updateMealPlan = updateMealPlan;
        
        function updateMealPlan(mealPlan) {
            MealPlanService
                .updateMealPlan(vm.mpid, mealPlan)
                .then(function (response) {
                        $location.url("/user/" + vm.uid + "/mealPlan");
                    },
                    function (error) {
                        vm.error = "Unable to update mealPlan."
                    });
        }

        function init() {

            UserService
                .loggedIn()
                .then(function (response) {
                        var user = response.data;
                        if (user == '0') {
                            $rootScope = null;
                        } else {
                            $rootScope.currentUser = user;
                            vm.user = user;
                        }
                    },
                    function (err) {
                        $location.url("/home")
                    });

            var mpid = $routeParams.mpid;

            MealPlanService
                .findMealPlanById(mpid)
                .then(function (response) {
                    vm.mealPlan = response.data;
                    vm.mealPlan.date = vm.mealPlan.date.substring(0, vm.mealPlan.date.indexOf("T"));
                });

        }

        init();

        function logout() {
            UserService
                .logout()
                .then(function (response) {
                        $location.url("/home");
                    },
                    function (error) {
                        $location.url("/home");
                    })
        }
    }
})();