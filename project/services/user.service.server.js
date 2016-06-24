/**
 * Created by yangjue on 5/31/16.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function (app, models) {

    var userModel = models.userModel;
    var mealPlanModel = models.mealPlanModel;

    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../../public/uploads'});

    app.get("/auth/ft/facebook", passport.authenticate('facebook'), facebookLogIn);
    app.get('/auth/ft/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        }));
    app.post("/api/ft/user", createUser);
    app.post("/api/ft/logout", logout);
    app.post("/api/ft/register", register);
    app.get("/api/ft/loggedIn", loggedIn);
    app.post("/api/ft/login", passport.authenticate('local'),  login);
    app.get("/api/ft/user", getUsers);
    app.get("/api/ft/user/:userId", findUserById);
    app.put("/api/ft/user/:userId", updateUser);
    app.delete("/api/ft/user/:userId", deleteUser);

    app.get("/api/ft/user/:userId/mealPlans", populateAllMealPlansForUser);
    app.put("/api/ft/user/:userId/follow", addFollow);
    app.put("/api/ft/user/:userId/unfollow", unFollow);

    app.post("/api/ft/upload", upload.single('avatarFile'), uploadImage);

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    // if it is default 'local', no need to provide 'local', if others, must provide
    passport.use('local', new LocalStrategy(localStrategy));
    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookLogIn));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    // this function expects username and password (with exact words) in request body
    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                    if(user) {
                        if(user && bcrypt.compareSync(password, user.password)) {
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                    } else {
                        return done(null, false);
                    }
                },
                function (error) {
                    if (err) { return done(err); }
                });
    }

    function serializeUser(user, done) {
        return done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    return done(err, null);
                }
            );
    }
    
    function facebookLogIn(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(function (facebookUser) {
                if (facebookUser) {
                    return done(null, facebookUser);
                } else {
                    facebookUser = {
                        "username": profile.displayName.replace(/ /g, ''),
                        "facebook" : {
                            "id": profile.id,
                            "token": token
                        }
                    };
                    userModel
                        .createUser(facebookUser)
                        .then(function (user) {
                            done(null, user);
                        });
                }
            });
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }
    
    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }
    
    function loggedIn(req, res) {
        if (req.isAuthenticated())
            res.json(req.user);
        else
            res.send('0');
    }
    
    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user) {
                    res.status(400).send("username already in use.");
                    return;
                } else {
                    req.body.password = bcrypt.hashSync(req.body.password);
                    return userModel
                        .createUser(req.body)
                }
            },
            function (error) {
                res.sendStatus(400);
            })
            .then(function (user) {
                if (user) {
                    req.login(user, function (err) {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    })
                }
                res.json(user);
            },
            function (error) {
                res.sendStatus(400);
            });
    }
    
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

        mealPlanModel
            .deleteMealPlanByUserId(id)
            .then(function (stat) {
                return userModel.deleteUser(id);
            },
            function (error) {
                res.status(400).send(error);
            })
            .then(function (stat) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.status(400).send(error);
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
                res.sendStatus(404);
            });
    }

    function getUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            findUserByCredentials(username, password, req, res);
        } else if (username) {
            findUserByUsername(username, res);
        } else {
            res.send(users);
        }
    }
    
    function findUserByCredentials(username, password, req, res) {
        userModel
            .findUserByCreadentials(username, password)
            .then(function (user) {
                //session
                // req.session.currentUser = user;
                res.json(user);
            },
            function (error) {
                res.sendStatus(404);
            });
    }
    
    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username, password)
            .then(function (user) {
                    res.json(user);
                },
                function (error) {
                    res.sendStatus(404);
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
    
    function populateAllMealPlansForUser(req, res) {
        var id = req.params.userId;
        userModel
            .populateAllMealPlansForUser(id)
            .then(function (response) {
                var mealPlans = response.mealPlans;
                res.json(mealPlans);
            },
            function (error) {
                res.status(404).send("Temporarily Cannot get meal plans");
            });
    }
    
    function addFollow(req, res) {
        var userId = req.params.userId;
        var followUser = req.body;
        userModel
            .addFollow(userId, followUser._id)
            .then(function (stat) {
                res.sendStatus(200);
            },
            function (error) {
                res.status(400).send(error);
            });
    }

    function unFollow(req, res) {
        var userId = req.params.userId;
        var followUser = req.body;
        userModel
            .unFollow(userId, followUser._id)
            .then(function (stat) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.status(400).send(error);
                });
    }

    function uploadImage(req, res) {

        var myFile = req.file;
        var uid = req.body.uid;

        if (myFile) {

            var originalname = myFile.originalname; // file name on user's computer
            var filename = myFile.filename;     // new file name in upload folder
            var path = myFile.path;         // full path of uploaded file
            var destination = myFile.destination;  // folder where file is saved to
            var size = myFile.size;
            var mimetype = myFile.mimetype;

            userModel
                .updateAvatar(uid, "/uploads/" + filename)
                .then(function (stat) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.status(400).send(error);
                });
        }

        res.redirect("/project/#/user/" + uid);
    }
};