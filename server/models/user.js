const db = require('../connexion/db')
const bcrypt = require('bcrypt')
// get all user
const getUser = (result) => {
    db.query('SELECT * FROM user', (err, results) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                result(null, results);
            }
        });
}

// get single user
const getUserById = (id, result) => {
    db.query('SELECT * FROM user WHERE id_user = ?', [id], (err, results) => {
            if (err) {
                return result(err);
            }
            else {
                return result(null, results);
            }
        });
};

// insert user into database
const insertUser = async (data, result) => {
    const salt = await bcrypt.genSalt();
    data.mdp_user = await bcrypt.hash(data.mdp_user, salt);
    db.query('INSERT INTO user SET?', [data], (err, results) => {
            if (err) {
                return result(err);
            } 
            else {
                return result(null, results);
            }
        });
};

// updated user to database
const updatedUser = (data, id, result) => {
    db.query('UPDATE user SET? WHERE id_user =?', [data, id], (err, results) => {
            if (err) {
                return result(err);
            }
            else {
                return result(null, results);
            }
        });
};

// delete user from database
const deleteUser = (id, result) => {
    db.query('DELETE FROM user WHERE id_user = ?', [id], (err, results) => {
            if (err) {
                return result(err);
            }
            else {
                return result(null, results);
            }
        });
};

module.exports = {
    getUser,
    getUserById,
    insertUser,
    updatedUser,
    deleteUser
}