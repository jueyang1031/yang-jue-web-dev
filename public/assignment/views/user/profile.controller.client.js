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
})();