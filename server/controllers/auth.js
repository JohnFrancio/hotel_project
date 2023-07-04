const authModel = require('../models/auth.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const checkAuth = (req, res) => {
	const pass = req.body.password
	const email = req.body.email
	authModel.getUserEmail(email, (err, results) => {
		if(err){
			return res.send(err)
		}if(!results || results.length == 0){
			authModel.getHotelEmail(email, (err, results) => {
				if(err){
					return res.send(err)
				}if(!resu || resu.length == 0){
					return res.json({message:"Email ou Mot de passe invalide."})
				}else{
					return res.json(resu)
					const result = bcrypt.compare(pass, resu.mdp_hotel)
					if(result || result.length != 0){
						resu.mdp_hotel = undefined
						const token = jwt.sign({ result: resu }, process.env.SECRET_KEY, {
							expiresIn: "1h"
						})
						return res.json({
							message: "Hotel connecte.",
							token: token
						})
					}else{
						return res.json({message:"Email ou Mot de passe invalide."})
					}
				}
			})
		}else{
			return res.json(results)
			const result = bcrypt.compare(pass, results.mdp_user)
			if(!result || result.length != 0){
				results.mdp_user = undefined
				const token = jwt.sign({ result: results }, process.env.SECRET_KEY, {
					expiresIn: "1h"
				})
				return res.json({
					message: "Client connecte.",
					token: token
				})
			}else{
				return res.json({message:"Email ou Mot de passe invalide."})
			}
		}
	})
}

module.exports = {
	checkAuth
}