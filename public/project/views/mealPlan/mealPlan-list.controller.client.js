/**
 * Created by yangjue on 6/21/16.
 */
(function () {
    angular
        .module("FoodTracker")
        .controller("MealPlanListController", MealPlanListController);

    function MealPlanListController($location, UserService, $rootScope, $routeParams, MealPlanService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.user = $rootScope.currentUser;
        var checkedMealPlanIds = [];
        vm.logout = logout;
        vm.checkedMealPlan = checkedMealPlan;
        vm.deleteMealPlans = deleteMealPlans;

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

            UserService
                .populateAllMealPlansForUser(vm.uid)
                .then(function (response) {
                    var results = response.data;
                    vm.mealPlans = [];
                    results.forEach(function (mealPlan) {
                        mealPlan.date = mealPlan.date.substring(0, mealPlan.date.indexOf("T"));
                        vm.mealPlans.push(mealPlan);
                    })
                },
                function (error) {
                    vm.error = "Temporarily cannot get meal plans";
                });

        }

        init();
        
        function checkedMealPlan(mealPlanId, $index) {
            console.log(mealPlanId);
            console.log($index);
            console.log($(".checkToDelete")[$index].checked);
            if ($(".checkToDelete")[$index].checked) {
                checkedMealPlanIds.push(mealPlanId);
            } else {
                for (var i = 0; i < checkedMealPlanIds.length; ++i) {
                    if (checkedMealPlanIds[i] === mealPlanId){
                        checkedMealPlanIds.splice(i, 1);
                        break;
                    }
                }
            }
        }
        
        function deleteMealPlans(userId) {
            checkedMealPlanIds.forEach(function (mealPlanId) {
                MealPlanService
                    .deleteMealPlan(userId, mealPlanId)
                    .then(function (response) {
                            init();
                    },
                    function (error) {
                        
                    });
            });
        }

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