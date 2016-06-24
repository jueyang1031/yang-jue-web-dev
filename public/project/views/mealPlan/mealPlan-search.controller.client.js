/**
 * Created by yangjue on 6/20/16.
 */
(function () {
    angular
        .module("FoodTracker")
        .controller("MealPlanSearchController", MealPlanSearchController);

    function MealPlanSearchController($location, UserService, $rootScope, $routeParams, MealPlanService) {
        var vm = this;

        vm.user = $rootScope.currentUser;
        vm.uid = $routeParams.uid;
        vm.logout = logout;
        vm.showUser = showUser;
        vm.hideUser = hideUser;
        vm.addFollow = addFollow;
        vm.unFollow = unFollow;

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
                .findUserById(vm.uid)
                .then(function (response) {
                    vm.user = response.data;
                    MealPlanService
                        .findAllMealPlans(vm.uid)
                        .then(function (response) {
                                vm.mealPlans = response.data;
                                for(var j = 0; j < vm.mealPlans.length; ++j) {
                                    for(var i = 0; i < vm.user.follows.length; ++i) {
                                        if (vm.mealPlans[j]._user
                                            && (vm.user.follows[i]._id === vm.mealPlans[j]._user._id)) {
                                            vm.mealPlans[j].follow = true;
                                            break;
                                        }
                                    }
                                }

                            },
                            function (error) {
                                vm.error = "Cannot find meal plan";
                            });

                })


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

        function showUser(user) {

            $('.modal').show();
        }
        
        function hideUser() {
            $('.modal').hide();
        }
        
        function addFollow(user) {
            UserService
                .addFollow(vm.uid, user)
                .then(function (response) {
                        // vm.showFollow = false;;
                    init();
                    },
                    function (error) {
                        vm.error = "Temporarily cannot follow user.";
                    });
        }

        function unFollow(user) {
            UserService
                .unFollow(vm.uid, user)
                .then(function (response) {
                        // vm.showFollow = true;
                    init();
                    },
                    function (error) {
                        vm.error = "Temporarily cannot follow user.";
                    });
        }

    }
})();