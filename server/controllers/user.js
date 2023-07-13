// import function from user model
const User = require('../models/user');

// get all users
const getAllUsers = (req, res) => {
    User.getUser((err, results) => {
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(results);
    });
};

// get user by id
const getUserById = (req, res) => {
    User.getUserById(req.params.id, (err, results) => {
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(results);
    });
};

// create user
const createUser = (req, res) => {
    console.log(req.file)
    const data = {
        nom_user: req.body.nom_user,
        email_user: req.body.email_user,
        contact_user:req.body.contact_user,
        mdp_user:req.body.mdp_user,
        img_user: req.file.buffer.toString('base64')
    }
    User.insertUser(data, (err, results) => {
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(results);
    });
};

// update user
const updateUser = (req, res) => {
    const data = {
        nom_user: req.body.nom_user,
        contact_user: req.body.contact_user,
        mdp_user: req.body.mdp_user
    }
    User.updatedUser(req.body, req.params.id, (err, results) => {
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(results);
    });
};

// delete user
const deleteUser = (req, res) => {
    User.deleteUser(req.params.id, (err, results) => {
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(results);
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}