const db = require('../connexion/db.js')

const getUserEmail = (email, result) => {
	db.query(`SELECT * FROM user WHERE email_user = '${email}'`, (err, results) => {
		if(err){
			return result(err)
		}else{
			return result(null, results)
		}
	})
}

const getHotelEmail = (email, result) => {
	db.query('SELECT * FROM acc_hotel WHERE email_hotel = ?', [email], (err, results) => {
		if(err){
			return result(err)
		}else{
			return result(null, results)
		}
	})
}

module.exports = {
	getUserEmail,
	getHotelEmail
}