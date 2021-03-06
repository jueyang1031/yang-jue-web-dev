/**
 * Created by yangjue on 5/26/16.
 */
(function(){
    angular
        .module("FoodTracker")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            findUserByUsername: findUserByUsername,
            login: login,
            logout: logout,
            loggedIn: loggedIn,
            register: register,
            populateAllMealPlansForUser: populateAllMealPlansForUser,
            addFollow: addFollow,
            unFollow: unFollow
        };
        return api;

        function unFollow(userId, user) {
            var url = "/api/ft/user/" + userId + "/unfollow";
            return $http.put(url, user);
        }
        
        function addFollow(userId, user) {
            var url = "/api/ft/user/" + userId + "/follow";
            return $http.put(url, user);
        }
        
        function populateAllMealPlansForUser(userId) {
            var url = "/api/ft/user/" + userId + "/mealPlans";
            return $http.get(url);
        }
        
        function register(user) {
            var url = "/api/ft/register";
            return $http.post(url, user);
        }
        
        function loggedIn() {
            var url = "/api/ft/loggedIn";
            return $http.get(url);
        }
        
        function logout(user) {
            var url = "/api/ft/logout";
            return $http.post(url);
        }

        function login(username, password) {
            var user = {
                username: username,
                password: password
            };
            var url = "/api/ft/login";
            return $http.post(url, user);
        }

        function findUserByUsername(username) {
            var url = "/api/ft/user?username=" + username;
            return $http.get(url);
        }

        function deleteUser(user) {
            var url = "/api/ft/user/" + user._id;
            return $http.delete(url);
        }

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }
        
        function updateUser(id, newUser) {
            var url = "/api/ft/user/" + id;
            return $http.put(url, newUser);
        }

        function findUserById(id) {
            var url = "/api/ft/user/" + id;
            return $http.get(url);
        }
        
        function findUserByCredentials(username, password) {
            var url = "/api/ft/user?username=" + username + "&password=" + password;
            return $http.get(url);
        }
    }
})();