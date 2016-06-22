/**
 * Created by yangjue on 5/25/16.
 */
(function(){
    angular
        .module("FoodTracker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/homepage.view.client.html",
                controller: "HomepageController",
                controllerAs: "model"
            })
            .when("/home/:uid", {
                templateUrl: "views/homepage.view.client.html",
                controller: "HomepageController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
                // resolve: {
                //     loggedIn: checkLoggedIn
                // }
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
                // resolve: {
                //     loggedIn: checkLoggedIn
                // }
            })
            .when("/search", {
                templateUrl: "views/food/food-search.view.client.html",
                controller: "FoodSearchController",
                controllerAs: "model"
                // resolve: {
                //     loggedIn: checkLoggedIn
                // }
            })
            .when("/search/:pid", {
                templateUrl: "views/food/food-detail.view.client.html",
                controller: "FoodDetailController",
                controllerAs: "model"
            })
            .when("/user/:uid/mealPlan", {
                templateUrl: "views/mealPlan/mealPlan-list.view.client.html",
                controller: "MealPlanListController",
                controllerAs: "model"
            })
            .when("/user/:uid/mealPlan/new", {
                templateUrl: "views/mealPlan/mealPlan-new.view.client.html",
                controller: "MealPlanNewController",
                controllerAs: "model"
            })
            .when("/user/:uid/mealPlan/:mpid", {
                templateUrl: "views/mealPlan/mealPlan-edit.view.client.html",
                controller: "MealPlanEditController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();