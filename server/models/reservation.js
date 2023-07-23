const db = require('../connexion/db')

// get reservation by id_hotel
const getReservationByHotelid = (id, result) => {
    db.query(`SELECT nom_user, contact_user, reserver_pour, nbr_jour, date_reservation, paye, chambre.id_chambre
    FROM reservation INNER JOIN chambre ON reservation.id_chambre=chambre.id_chambre
    INNER JOIN user ON user.id_user=reservation.id_user WHERE chambre.id_hotel = ?`, [id], (err, results) => {
            if (err) {
                return result(err);
            }
            else {
                return result(null, results);
            }
        });
};

const getReservation = (result) => {
    db.query(`SELECT * FROM reservation INNER JOIN chambre ON reservation.id_chambre=chambre.id_chambre 
    INNER JOIN user ON user.id_user=reservation.id_user 
    INNER JOIN acc_hotel ON chambre.id_hotel=acc_hotel.id_hotel`, (err, results) => {
            if (err) {
                return result(err);
            }
            else {
                return result(null, results);
            }
        });
};

// get reservation by id
const getReservationByUserid = (id, result) => {
    db.query(`SELECT id_reservation,img_chambre, nom_hotel, chambre.prix, adresse_hotel, reserver_pour, nbr_jour, date_reservation, paye, chambre.id_chambre
    FROM reservation INNER JOIN chambre ON chambre.id_chambre=reservation.id_chambre
    INNER JOIN acc_hotel ON chambre.id_hotel=acc_hotel.id_hotel WHERE id_user = ?`, [id], (err, results) => {
            if (err) {
                return result(err);
            }
            else {
                return result(null, results);
            }
        });
};

// insert reservation into database
const insertReservation = (data, result) => {
    db.query('INSERT INTO reservation SET?', [data], (err, results) => {
            if (err) {
                return result(err);
            } 
            else {
                return result(null, results);
            }
        });
};

//update reservation in database
const updateReservation = async (id, result) => {
    db.query(`UPDATE reservation SET paye='oui' WHERE id_reservation =?`, [id], (err, results) => {
        if (err) {
            return result(err);
        }
        else {
            return result(null, results);
        }
    });
};

// delete reservation from database
const deleteReservation = (id, result) => {
    db.query('DELETE FROM reservation WHERE id_reservation = ?', [id], (err, results) => {
            if (err) {
                return result(err);
            }
            else {
                return result(null, results);
            }
        });
};

module.exports = {
    getReservationByHotelid,
    getReservationByUserid,
    insertReservation,
    updateReservation,
    deleteReservation,
    getReservation
}