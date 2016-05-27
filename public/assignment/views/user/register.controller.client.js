/**
 * Created by yangjue on 5/27/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);
    
    function RegisterController($location, UserService) {
        var vm = this;
        vm.createUser = createUser;
        function createUser(username, password, verifyPassword) {
            if (password === verifyPassword) {
                var newUser = {
                    username: username,
                    password: password
                };
                var user = UserService.createUser(newUser);
                $location.url("/user/" + user._id);

            } else {
                vm.error = "Please verify your password."
            }

        }
    }
})();