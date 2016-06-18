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
        vm.register = register;

        function register(username, password, verifyPassword) {
            if (!username || !password || !verifyPassword) {
                vm.error = "Empty or incorrect fields";
                return;
            }            if (password === verifyPassword) {
                var newUser = {
                    username: username,
                    password: password
                };

                UserService
                    .register(newUser)
                    .then(function (response) {
                            var user = response.data;
                            $location.url("/user/" + user._id);
                        },
                        function (error) {
                            vm.error = error.data;
                        })
            } else {
                vm.error = "Please verify your password."
            }
        }
        
        function createUser(username, password, verifyPassword) {
            if (!username || !password || !verifyPassword) {
                vm.error = "Empty or incorrect fields";
                return;
            }
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