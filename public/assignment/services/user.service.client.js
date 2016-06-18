/**
 * Created by yangjue on 5/26/16.
 */
(function(){
    angular
        .module("WebAppMaker")
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
            register: register
        };
        return api;
        
        function register(user) {
            var url = "/api/register";
            return $http.post(url, user);
        }
        
        function loggedIn() {
            var url = "/api/loggedIn";
            return $http.get(url);
        }
        
        function logout(user) {
            var url = "/api/logout";
            return $http.post(url);
        }

        function login(username, password) {
            var user = {
                username: username,
                password: password
            };
            var url = "/api/login";
            return $http.post(url, user);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        function deleteUser(user) {
            var url = "/api/user/" + user._id;
            return $http.delete(url);
        }

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }
        
        function updateUser(id, newUser) {
            var url = "/api/user/" + id;
            return $http.put(url, newUser);
        }

        function findUserById(id) {
            var url = "/api/user/" + id;
            return $http.get(url);
        }
        
        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url);
        }
    }
})();