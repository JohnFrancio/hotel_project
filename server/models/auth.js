const db = require('../connexion/db.js')

const getUserEmail = (email, result) => {
	db.query('SELECT * from user WHERE email_user = ?', [email], (err, results) => {
		if(err){
			return result(err)
		}else{
			return result(results)
		}
	})
}

const getHotelEmail = (email, result) => {
	db.query('SELECT * from acc_hotel WHERE email_hotel = ?', [email], (err, results) => {
		if(err){
			return result(err)
		}else{
			return result(results)
		}
	})
}

module.exports = {
	getUserEmail,
	getHotelEmail
}