const authModel = require('../models/auth.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const checkAuth = (req, res) => {
	const { email, password } = req.body
	if(!email || !password) return (res.send("Veuillez completer les champs."))
// auth for the client
	authModel.getUserEmail(email, async (err, results) => {
		if(err) return res.send(err)
		if(!results[0] || results[0].length == 0){
// auth for the hotel
			authModel.getHotelEmail(email, async (err, data) => {
				if(err) return res.send(err)
				if(!data[0] || data[0].length == 0){
					return res.send("L'email ou le mot de passe invalide.")
				}else{
					const validPass = await bcrypt.compare(password, data[0].mdp_hotel)
					if(validPass){
						data[0].mdp_hotel = null;
						const token = jwt.sign({ result: data }, process.env.SECRET_KEY, {
							expiresIn: "1h"
						})
						return res.json({
							status: 1,
							token: token,
							user: data[0],
							role: "hotel"
						})
					}else{
						return res.send("Email ou mot de passe invalide.")
					}
				}
			})
		}else{
			const validPass = await bcrypt.compare(password, results[0].mdp_user)
			results[0].mdp_user = null;
			if(validPass){
				const token = jwt.sign({ result: results }, process.env.SECRET_KEY, {
					expiresIn: "1h"
				})
				return res.json({
					status: 1,
					token: token,
					user: results[0],
					role: "user"
				})
			}else{
				return res.json("Email ou mot de passe invalide.")
			}
		}
	})
}
module.exports = {checkAuth}
