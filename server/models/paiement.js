const db = require('../connexion/db')

const getPaiement = (id, result) => {
    db.query(`SELECT serverCorrelationId FROM paiement WHERE id_reservation = ?`, [id], (err, results) => {
            if (err) {
                return result(err);
            }
            else {
                return result(null, results);
            }
        });
};


const getInfoPaiement = (id, result) => {
    db.query(`SELECT * FROM paiement INNER JOIN reservation ON reservation.id_reservation=paiement.id_reservation
        INNER JOIN chambre ON chambre.id_chambre=reservation.id_chambre
        INNER JOIN acc_hotel ON acc_hotel.id_hotel=chambre.id_hotel WHERE paiement.id_reservation = ?`, [id], (err, results) => {
            if(err){
                return result(err)
            }else{
                return result(null, results)
            }
        })
}

const insertPaiement = (data, result) => {
    db.query('INSERT INTO paiement SET?', [data], (err, results) => {
            if (err) {
                return result(err);
            } 
            else {
                return result(null, results);
            }
        });
};

const updatePaiement = (ref, id, result) => {
    db.query('UPDATE paiement SET objectReference = ? WHERE id_paiement = ?', [ref, id], (err, results) => {
            if (err) {
                return result(err);
            } 
            else {
                return result(null, results);
            }
        });
};

module.exports = {
    getPaiement,
    insertPaiement,
    updatePaiement,
    getInfoPaiement
}