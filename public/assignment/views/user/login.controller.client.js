/**
 * Created by yangjue on 5/25/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;

        vm.login = login;

        function login(username, password) {
            var user = UserService.findUserByCredentials(username, password);
                if (user) {
                    $location.url("/user/" + user._id);
                } else {
                    vm.error = "User not found";
                }
        }
    }
})();