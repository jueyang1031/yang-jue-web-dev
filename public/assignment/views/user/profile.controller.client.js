/**
 * Created by yangjue on 5/25/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);
    
    function ProfileController($routeParams, UserService, $location) {
        var vm = this;
        var id = $routeParams.uid;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;

        function init() {
            UserService
                .findUserById(id)
                .then(function (response) {
                    vm.user = response.data;
                });
        }
        init();
        
        function logout() {
            UserService
                .logout()
                .then(function (response) {
                        $location.url("/login");
                },
                function (error) {
                    $location.url("/login");
                })
        }
        
        function deleteUser(user) {
            UserService
                .deleteUser(user)
                .then(function (response) {
                    $location.url("/login");
                },
                function (error) {
                    vm.error = "Unable to unregister."
                });
        }

        function updateUser(newUser) {
            UserService
                .updateUser(id, newUser)
                .then(function (response) {
                    vm.success = "Success! Your profile was saved."
                },
                function (error) {
                    vm.error = "Unable to update profile."
                });

            // users[index].firstName = newUser.firstName;
            // users[index].lastName = newUser.lastName;
            // vm.success = "Success! Your profile was saved."
        }
    }
})();