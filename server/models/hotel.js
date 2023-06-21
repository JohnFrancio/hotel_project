const db = require('../connexion/db')
const bcrypt = require('bcrypt')

//get hotel from database
const getAllHotels = (result) => {
    db.query('SELECT * FROM acc_hotel', (err, res) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(res);
                result(null, res);
            }
        });
};

//get hotel from database by id
const getHotelById = (id, result) => {
    db.query('SELECT * FROM acc_hotel WHERE id_hotel =?', [id], (err, res) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(res);
                result(null, res);
            }
        });
};

//insert hotel into database
const insertHotel = async (data, result) => {
    const salt = await bcrypt.genSalt();
    data.mdp_hotel = await bcrypt.hash(data.mdp_hotel, salt);
    db.query('INSERT INTO acc_hotel SET?', [data], (err, res) => {
            if (err) {
                console.log(err);
                console.log(err.sqlMessage);
            }
            else {
                console.log(res);
                result(null, res);
            }
        });
};

//update hotel in database
const updateHotel = async (data, id, result) => {
    db.query('UPDATE acc_hotel SET? WHERE id_hotel =?', [data, id], (err, res) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(res);
                result(null, res);
            }
        });
};

//delete hotel from database
const deleteHotel = async (id, result) => {
    db.query('DELETE FROM acc_hotel WHERE id_hotel =?', [id], (err, res) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(res);
                result(null, res);
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