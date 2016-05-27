/**
 * Created by yangjue on 5/25/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController);
    //
    // var users = [
    //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    // ];
    
    function ProfileController($routeParams, UserService) {
        var vm = this;
        var id = $routeParams.uid;
        var index = -1;
        vm.updateUser = updateUser;

        function init() {
            vm.user = UserService.findUserById(id);
        }
        init();

        function updateUser(newUser) {
            if (UserService.updateUser(id, newUser))
                vm.success = "Success! Your profile was saved."
            // users[index].firstName = newUser.firstName;
            // users[index].lastName = newUser.lastName;
            // vm.success = "Success! Your profile was saved."
        }
    }

    function LoginController($location, UserService) {
        var vm = this;

        vm.login = login;

        function login(username, password) {
            var user = UserService.findUserByUsernameAndPassword(username, password);
                if (user) {
                    $location.url("/user/" + user._id);
                } else {
                    vm.error = "User not found";
                }
        }
    }
})();