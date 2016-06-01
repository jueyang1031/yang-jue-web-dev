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
                
                UserService
                    .createUser(newUser)
                    .then(function (response) {
                        var user = response.data;
                        $location.url("/user/" + user._id);
                    },
                    function (error) {
                        vm.error = "Unable to register."
                    })
            } else {
                vm.error = "Please verify your password."
            }

        }
    }
})();