/**
 * Created by yangjue on 6/21/16.
 */
(function () {
    angular
        .module("FoodTracker")
        .controller("MealPlanCopyController", MealPlanCopyController);

    function MealPlanCopyController($location, UserService, $rootScope, $routeParams, MealPlanService, SpoonacularService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.mpid = $routeParams.mpid;
        vm.user = $rootScope.currentUser;
        vm.offset = 0;
        vm.logout = logout;
        vm.saveMealPlan = saveMealPlan;
        vm.addNewMeal = addNewMeal;
        vm.removeMeal = removeMeal;
        vm.searchProducts = searchProducts;
        vm.hideSearch = hideSearch;
        vm.addFood = addFood;
        vm.showSearch = showSearch;
        vm.removeFood = removeFood;

        function removeFood(foodId, mid) {
            for (var i = 0; i < vm.meals.length; ++i) {
                if (vm.meals[i].mid === mid) {
                    for (var j = 0; j < vm.meals[i].foods.length; ++j) {
                        if (vm.meals[i].foods[j].id === foodId) {
                            vm.meals[i].foods.splice(j, 1);
                            break;
                        }
                    }
                    break;
                }
            }
        }

        function saveMealPlan(mealPlan) {
            var validated = true;
            if (!mealPlan || !mealPlan.date || !mealPlan.title || mealPlan.meals.length==0)
                validated = false;
            mealPlan.meals.forEach(function (meal) {
                if (!meal.timeSlot || !meal.title || meal.foods.length==0)
                    validated = false;
            });
            if (!validated) {
                vm.error = "Please fill empty fields. And please add at least one meal and at least one food";
                return;
            }
            delete mealPlan._id;

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

            MealPlanService
                .findMealPlanById(vm.mpid)
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

        function addNewMeal() {
            var newId = vm.mealPlan.meals.length;
            var meal = {
                "mid": newId,
                "timeSlot": "",
                "title": "",
                "foods": []
            };
            vm.mealPlan.meals.push(meal);
        }

        function addFood(food, mid) {
            for (var i = 0; i < vm.mealPlan.meals.length; ++i) {
                if (vm.mealPlan.meals[i].mid === mid) {
                    vm.mealPlan.meals[i].foods.push(food);
                    break;
                }
            }
            hideSearch(mid);
        }

        function searchProducts(offset, searchText, mid, start) {
            vm.offset = offset;
            if (start === 0) vm.offset = 0;
            var offsetString = vm.offset + "";
            SpoonacularService
                .searchProducts(offsetString, searchText)
                .then(function(response) {
                    var data = response.data.products;
                    vm.totalProducts = response.data.totalProducts;
                    // data = data.substring(0,data.length - 1);
                    console.log(data);
                    // data = JSON.parse(data);
                    vm.productList = data;
                });
            if (start === 0) showSearch(mid);
        }

        function hideSearch(mid) {
            $(".meal" + mid).hide();
        }

        function showSearch(mid) {
            $(".meal" + mid).show();
        }

        function removeMeal(mid) {
            for (var i = 0; i < vm.mealPlan.meals.length; i++) {
                if (vm.mealPlan.meals[i].mid === mid) {
                    vm.mealPlan.meals.splice(i, 1);
                    for(var j = i; j < vm.mealPlan.meals.length; ++j) {
                        vm.mealPlan.meals[j].mid = vm.mealPlan.meals[j].mid - 1;
                    }
                    break;
                }
            }
        }
    }
})();