/**
 * Created by yangjue on 6/21/16.
 */
(function () {
    angular
        .module("FoodTracker")
        .controller("MealPlanNewController", MealPlanNewController);

    function MealPlanNewController($location, UserService, $rootScope, $routeParams, MealPlanService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.user = $rootScope.currentUser;
        vm.logout = logout;
        vm.createMealPlan = createMealPlan;
        
        function createMealPlan(date, title, description) {
            var mealPlan = {
                "date" : date,
                "title" : title,
                "description" : description
            };

            MealPlanService
                .createMealPlan(vm.uid, mealPlan)
                .then(function (response) {
                        $location.url("/user/" + vm.uid + "/mealPlan");
                },
                function (error) {
                    vm.error = "Unable to create meal plan";
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