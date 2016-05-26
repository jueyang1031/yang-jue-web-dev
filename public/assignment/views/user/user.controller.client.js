/**
 * Created by yangjue on 5/25/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];
    
    function ProfileController($routeParams) {
        var vm = this;
        var id = $routeParams.id;
        var index = -1;
        vm.updateUser = updateUser;
        function init() {
            for(var i in users) {
                if(users[i]._id === id) {
                    vm.user = angular.copy(users[i]);
                    index = i;
                }
            }
        }
        init();

        function updateUser(newUser) {
            users[index].firstName = newUser.firstName;
            users[index].lastName = newUser.lastName;
            vm.success = "Success! Your profile was saved."
        }
    }

    function LoginController($location) {
        var vm = this;

        vm.login = login;

        function login(username, password) {
            for (var i in users) {
                if (username === users[i].username && password === users[i].password) {
                    $location.url("/user/" + users[i]._id);
                } else {
                    vm.error = "User not found";
                }
            }
        }
    }
})();