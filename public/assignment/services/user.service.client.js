/**
 * Created by yangjue on 5/26/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    function UserService() {
        var api = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            findUserByUsername: findUserByUsername
        };
        return api;

        function findUserByUsername(username) {
            var usersByUsername = [];
            for (var i in users) {
                if (username === users[i].username)
                    usersByUsername.push(users[i]);
            }
            return usersByUsername;
        }

        function deleteUser(user) {
            for (var i in users) {
                if (user._id === users[i]._id) {
                    users.slice(i, 1);
                    return true;
                }

            }
            return false;
        }

        function createUser(user) {
            user._id = (new Date().getTime()) + "";
            // var newUser = {
            //     _id: (new Date().getTime()) + "",
            //     username: username,
            //     password: password
            // };
            users.push(user);
            return user;
        }
        
        function updateUser(id, newUser) {
            for (var i in users) {
                if (users[i]._id === id) {
                    users[i].firstName = newUser.firstName;
                    users[i].lastName = newUser.lastName;
                    return true;
                }

            }
            return false;
        }

        function findUserById(id) {
            for (var i in users) {
                if (users[i]._id === id) {
                    return users[i];
                }

            }
            return null;
        }
        
        function findUserByCredentials(username, password) {
            for (var i in users) {
                if (username === users[i].username && password === users[i].password) {
                    return users[i];
                }

            }
            return null;
        }
    }
})();