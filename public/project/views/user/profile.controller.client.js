/**
 * Created by yangjue on 5/25/16.
 */
(function () {
    angular
        .module("FoodTracker")
        .controller("ProfileController", ProfileController);
    
    function ProfileController($routeParams, UserService, $location, $rootScope) {
        var vm = this;
        // var id = $rootScope.currentUser._id;
        vm.uid = $routeParams.uid;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.unFollow = unFollow;
        vm.showModal = showModal;
        vm.hideModal = hideModal;
        vm.logout = logout;

        function init() {
            UserService
                .findUserById(vm.uid)
                .then(function (response) {
                    vm.user = response.data;
                });
        }
        init();
        
        function showModal() {
            $('.modal').show();
        }
        function hideModal() {
            $('.modal').hide();
        }
        
        function unFollow(unfollowUser) {
            UserService
                .unFollow(vm.uid, unfollowUser)
                .then(function (response) {
                        // vm.showFollow = true;
                        init();
                    },
                    function (error) {
                        vm.error = "Temporarily cannot follow user.";
                    });
        }
        
        function deleteUser(user) {
            UserService
                .deleteUser(user)
                .then(function (response) {
                    $location.url("/home");
                },
                function (error) {
                    vm.error = "Unable to unregister."
                });
        }

        function updateUser(newUser) {
            UserService
                .updateUser(vm.uid, newUser)
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