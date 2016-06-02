/**
 * Created by yangjue on 5/31/16.
 */
module.exports = function (app) {
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    
    function createUser(req, res) {
        var newUser = req.body;
        newUser._id = (new Date().getTime()) + "";
        users.push(newUser);
        res.send(newUser);
    }
    
    function deleteUser(req, res) {
        var id = req.params.userId;
        for (var i in users) {
            if (id === users[i]._id) {
                users.slice(i, 1);
                res.send(200);
                return;
            }

        }
        res.send(400);
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;
        for (var i in users) {
            if (users[i]._id === id) {
                users[i].firstName = newUser.firstName;
                users[i].lastName = newUser.lastName;
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function getUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            findUserByCredentials(username, password, res);
        } else if (username) {
            findUserByUsername(username, res);
        } else {
            res.send(users);
        }
    }
    
    function findUserByCredentials(username, password, res) {
        for (var i in users) {
            if (username === users[i].username && password === users[i].password) {
                res.send(users[i]);
                return;
            }
        }
        res.send({});
    }
    
    function findUserByUsername(username, res) {
        for (var i in users) {
            if (username === users[i].username) {
                res.send(users[i]);
                return;
            }
        }
        res.send({});
    }
    
    function findUserById(req, res) {
        var id = req.params.userId;
        for (var i in users) {
            if (id === users[i]._id) {
                res.send(users[i]);
                return;
            }
        }
        res.send({});
    }
};