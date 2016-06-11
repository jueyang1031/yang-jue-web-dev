/**
 * Created by yangjue on 5/31/16.
 */
module.exports = function (app, models) {

    var userModel = models.userModel;

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

        userModel
            .createUser(newUser)
            .then(function (user) {
                    res.json(user);
            },
            function (error) {
                res.sendStatus(400);
            });
    }
    
    function deleteUser(req, res) {
        var id = req.params.userId;

        userModel
            .deleteUser(id)
            .then(function (stat) {
                res.sendStatus(200);
            }, 
            function (error) {
                res.statusCode(404).send(error);
            });
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(id, newUser)
            .then(function (stat) {
                res.sendStatus(200);
            },
            function (error) {
                res.statusCode(404).send();
            });
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
        userModel
            .findUserByCreadentials(username, password)
            .then(function (user) {
                res.json(user);
            },
            function (error) {
                res.statusCode(404).send(error);
            });
    }
    
    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username, password)
            .then(function (user) {
                    res.json(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                });
    }
    
    function findUserById(req, res) {
        
        var id = req.params.userId;
        userModel
            .findUserById(id)
            .then(function (response) {
                res.json(response);
            },
            function (error) {
                res.sendStatus(404);
            });
    }
};