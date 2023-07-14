const db = require('../connexion/db')

//get room from database
const getAllRoom = (result) => {
    db.query('SELECT * FROM chambre INNER JOIN acc_hotel ON chambre.id_hotel = acc_hotel.id_hotel', (err, results) => {
            if (err) {
                return result(err);
            }
            else {
                return result(null, results);
            }
        });
};

//get room from database by id
const getRoomById = (id_hotel, result) => {
    db.query('SELECT * FROM chambre INNER JOIN acc_hotel ON chambre.id_hotel = acc_hotel.id_hotel WHERE acc_hotel.id_hotel = ?',[id_hotel], (err, results) => {
            if (err) {
                return result(err);
            }
            else {
                return result(null, results);
            }
        });
};

//insert room into database
const insertRoom = (nbr_pers, nbr_lit1, nbr_lit2, nbr_douche, nbr_tele, prix,
                img_chambre, id_hotel, result) => {
    db.query(`INSERT INTO chambre(nbr_pers,nbr_lit1,nbr_lit2,nbr_douche,nbr_tele,prix,img_chambre,id_hotel) 
        VALUES(?,?,?,?,?,?,?,?)`, [
                nbr_pers,
                nbr_lit1,
                nbr_lit2,
                nbr_douche,
                nbr_tele,
                prix,
                img_chambre,
                id_hotel
            ], (err, results) => {
            if (err) {
                return result(err);
            }
            else {
                return result(null, results);
            }
        });
};

//update room in database
const updateRoom = async (data, id, result) => {
    db.query('UPDATE chambre SET? WHERE id_chambre =?', [data, id], (err, results) => {
            if (err) {
                return result(err);
            }
            else {
                return result(null, results);
            }
        });
};

//delete room from database
const deleteRoom = async (id, result) => {
    db.query('DELETE FROM chambre WHERE id_chambre =?', [id], (err, results) => {
            if (err) {
                return result(err);
            }
            else {
                return result(null, results);
            }
        });
};

module.exports = {
    getAllRoom,
    getRoomById,
    insertRoom,
    updateRoom,
    deleteRoom
};