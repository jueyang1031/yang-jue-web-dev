/**
 * Created by yangjue on 6/20/16.
 */
(function () {
    angular
        .module("FoodTracker")
        .controller("HelpController", HelpController);

    function HelpController($location, UserService, $rootScope) {
        var vm = this;

        vm.user = $rootScope.currentUser;
        vm.logout = logout;

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