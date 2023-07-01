// import function from user model
const User = require('../models/user');

// get all users
const getAllUsers = (req, res) => {
    User.getUser((err, results) => {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// get user by id
const getUserById = (req, res) => {
    User.getUserById(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// create user
const createUser = (req, res) => {
    User.insertUser(req.body, (err, results) => {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

// update user
const updateUser = (req, res) => {
    User.updatedUser(req.body, req.params.id, (err, results) => {
        if (err) {
            res.json(err);
        }else {
            res.json(results);
        }
    });
};

// delete user
const deleteUser = (req, res) => {
    User.deleteUser(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}