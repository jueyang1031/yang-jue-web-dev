/**
 * Created by yangjue on 5/25/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);
    
    function ProfileController($routeParams, UserService) {
        var vm = this;
        var id = $routeParams.uid;
        vm.updateUser = updateUser;

        function init() {
            UserService
                .findUserById(id)
                .then(function (response) {
                    vm.user = response.data;
                });
        }
        init();

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