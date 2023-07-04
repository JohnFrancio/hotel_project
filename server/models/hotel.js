const db = require('../connexion/db')
const bcrypt = require('bcrypt')

//get hotel from database
const getAllHotels = (result) => {
    db.query('SELECT * FROM acc_hotel', (err, results) => {
            if (err) {
                return result(err);
            }
            else {
                return result(null, results);
            }
        });
};

//get hotel from database by id
const getHotelById = (id, result) => {
    db.query('SELECT * FROM acc_hotel WHERE id_hotel =?', [id], (err, results) => {
            if (err) {
                return result(err);
            }
            else {
                return result(null, results);
            }
        });
};

//insert hotel into database
const insertHotel = async (data, result) => {
    const salt = await bcrypt.genSalt();
    data.mdp_hotel = await bcrypt.hash(data.mdp_hotel, salt);
    db.query('INSERT INTO acc_hotel SET?', [data], (err, results) => {
            if (err) {
                return result(err);
            }
            else {
                return result(null, results);
            }
        });
};

//update hotel in database
const updateHotel = async (data, id, result) => {
    db.query('UPDATE acc_hotel SET? WHERE id_hotel =?', [data, id], (err, results) => {
            if (err) {
                return result(err);
            }
            else {
                return result(null, results);
            }
        });
};

//delete hotel from database
const deleteHotel = async (id, result) => {
    db.query('DELETE FROM acc_hotel WHERE id_hotel =?', [id], (err, results) => {
            if (err) {
                return result(err);
            }
            else {
                return result(null, results);
            }
        });
};

module.exports = {
    getAllHotels,
    getHotelById,
    insertHotel,
    updateHotel,
    deleteHotel
};