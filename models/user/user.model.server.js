var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function findUserByCredentials(credentials) {
    return userModel.findOne(credentials, {username: 1});
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function createUser(user) {
    return userModel.create(user);
}

function findAllUsers() {
    return userModel.find();
}

function updateUser(user,userId) {
    return userModel.update({
        _id: userId
    }, {
        $set: user
    });
}

function deleteUser(userId) {
    return userModel.findByIdAndRemove(userId);
}

var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    findUserByCredentials: findUserByCredentials,
    updateUser:updateUser,
    deleteUser:deleteUser
};

module.exports = api;