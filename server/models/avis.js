const db = require('../connexion/db.js')

const getAvis = (result) => {
	db.query(`SELECT id_avis, nom_hotel, nom_user,img_user, avis.id_user, avis, date_avis FROM avis INNER JOIN user ON user.id_user=avis.id_user INNER JOIN acc_hotel ON
	avis.id_hotel=acc_hotel.id_hotel`, (err, results) => {
		if(err){
			return result(err)
		}else{
			return result(null, results)
		}
	})
}

const getAvisHotelId = (id, result) => {
	db.query(`SELECT id_avis, nom_hotel, nom_user,img_user, avis.id_user, avis, date_avis FROM avis INNER JOIN user ON user.id_user=avis.id_user 
	INNER JOIN acc_hotel ON avis.id_hotel=acc_hotel.id_hotel
	WHERE avis.id_hotel =?`,[id], (err, results) => {
		if(err){
			return result(err)
		}else{
			return result(null, results)
		}
	})
}

const insertAvis = (data, result) => {
	db.query('INSERT INTO avis SET?', [data], (err, results) => {
		if(err){
			return result(err)
		}else{
			return result(null, results)
		}
	})
}

const deleteAvis = (id, result) => {
    db.query('DELETE FROM avis WHERE id_avis = ?', [id], (err, results) => {
            if (err) {
                return result(err);
            }
            else {
                return result(null, results);
            }
        });
};

module.exports = {
	getAvis,
	getAvisHotelId,
	insertAvis,
	deleteAvis
}