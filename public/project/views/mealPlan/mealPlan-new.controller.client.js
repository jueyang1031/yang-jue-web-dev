/**
 * Created by yangjue on 6/21/16.
 */
(function () {
    angular
        .module("FoodTracker")
        .controller("MealPlanNewController", MealPlanNewController);

    function MealPlanNewController($location, UserService, $rootScope, $routeParams, MealPlanService, SpoonacularService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.user = $rootScope.currentUser;
        vm.meals = [];
        vm.offset = 0;
        // vm.searchText = "";
        // vm.edittingMealIndex = -1;
        vm.logout = logout;
        vm.createMealPlan = createMealPlan;
        vm.addNewMeal = addNewMeal;
        vm.removeMeal = removeMeal;
        vm.searchProducts = searchProducts;
        vm.hideSearch = hideSearch;
        vm.addFood = addFood;
        vm.showSearch = showSearch;
        vm.resetForm = resetForm;
        vm.removeFood = removeFood;

        function resetForm() {
            $('#form')[0].reset();
            $('#mealForm')[0].reset();
            vm.meals = [];
            // $form.find('input:text, input:password, input:file, select, textarea').val('');
            // $form.find('input:radio, input:checkbox')
            //     .removeAttr('checked').removeAttr('selected');
        }

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
        
        function addFood(food, mid) {
            for (var i = 0; i < vm.meals.length; ++i) {
                if (vm.meals[i].mid === mid) {
                    vm.meals[i].foods.push(food);
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
            for (var i = 0; i < vm.meals.length; i++) {
                if (vm.meals[i].mid === mid) {
                    vm.meals.splice(i, 1);
                    for(var j = i; j < vm.meals.length; ++j) {
                        vm.meals[j].mid = vm.meals[j].mid - 1;
                    }
                    break;
                }
            }
        }
        
        function addNewMeal() {
            var newId = vm.meals.length;
            var meal = {
                "mid": newId,
                "timeSlot": "",
                "title": "",
                "foods": []
            };
            vm.meals.push(meal);
        }
        
        function createMealPlan(date, title, description) {
            var validated = true;
            if (!date || !title || vm.meals.length==0)
                validated = false;
            vm.meals.forEach(function (meal) {
                if (!meal.timeSlot || !meal.title || meal.foods.length==0)
                    validated = false;
            });
            if (!validated) {
                vm.error = "Please fill empty fields. And please add at least one meal and at least one food";
                return;
            }
            var mealPlan = {
                "date" : date,
                "title" : title,
                "description" : description,
                "meals" : vm.meals
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