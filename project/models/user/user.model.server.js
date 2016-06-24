/**
 * Created by yangjue on 6/9/16.
 */
module.exports = function () {

    var mongoose = require("mongoose");

    var UserSchema = require("./user.schema.server.js")();
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCreadentials: findUserByCreadentials,
        findUserByUsername: findUserByUsername,
        deleteUser: deleteUser,
        updateUser: updateUser,
        findUserByFacebookId: findUserByFacebookId,
        pushMealPlan: pushMealPlan,
        populateAllMealPlansForUser: populateAllMealPlansForUser,
        deleteMealPlan: deleteMealPlan,
        addFollow: addFollow,
        unFollow: unFollow,
        updateAvatar: updateAvatar
    };
    return api;
    
    function updateAvatar(userId, url) {
        return User
            .findById(userId)
            .then(function (user) {
                    user.avatar = url;
                    user.save(function(err,doc){});
                },
                function (error) {

                });
    }
    
    function unFollow(userId, unfollowUserId) {
        return User
            .findById(userId)
            .then(function (user) {
                for (var i = 0; i < user.follows.length; ++i) {
                    if (user.follows[i].toString() == unfollowUserId) {
                        user.follows.splice(i, 1);
                        user.save(function(err,doc){});
                        break;
                    }
                }
            },
            function (error) {
                
            });
    }
    
    function addFollow(userId, followUserId) {
        return User
            .findById(userId)
            .then(function (user) {
                    user.follows.push(followUserId);
                    user.save(function(err,doc){});
                },
                function (error) {

                });
    }
    
    function deleteMealPlan(userId, mealPlanId) {
        return User
            .findById(userId)
            .then(function (user) {
                for (var i = 0; i < user.mealPlans.length; ++i) {
                    if (user.mealPlans[i].toString() === mealPlanId) {
                        user.mealPlans.splice(i, 1);
                        break;
                    }
                }
                user.save(function(err,doc){});
            },
            function (error) {
                
            });
    }

    function populateAllMealPlansForUser(userId) {
        return User
            .findById(userId)
            .populate('mealPlans')
            .exec();
    }
    
    function pushMealPlan(userId, mealPlan) {
        return User
            .findById(userId)
            .then(function (user) {
                user.mealPlans.push(mealPlan);
                user.save(function(err,doc){});
            },
            function (error) {
                
            });
    }

    function findUserByFacebookId(facebookId) {
        return User.findOne({'facebook.id': facebookId});
    }

    function updateUser(id, user) {
        return User.update({_id: id}, {
            $set: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
    }
    
    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
    
    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    function findUserByCreadentials(username, password) {
        return User.findOne({username: username, password: password});
    }
    
    function findUserById(userId) {
        return User
            .findById(userId)
            .populate('follows')
            .exec();
    }

    function createUser(user) {
        return User.create(user);
    }
};