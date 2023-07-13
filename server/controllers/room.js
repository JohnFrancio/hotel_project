const roomModel = require('../models/room');


//get room by id
const getRoomById = (req, res) => {
    roomModel.getRoomById(req.params.id, (err, results) => {
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(results);
    })
}

//create a room
const createRoom = (req, res) => {
    // const data = {		    	
    const nbr_pers= req.body.nbr_pers
    const nbr_lit1= req.body.nbr_lit1 == "" ? '0' : req.body.nbr_lit1
    const nbr_lit2=req.body.nbr_lit1 == "" ? '0' : req.body.nbr_lit2
    const nbr_douche=req.body.nbr_douche
    const nbr_tele= req.body.nbr_tele == "" ? '0' : req.body.nbr_tele
    const prix= parseInt(req.body.prix)
    const img_chambre= req.file.buffer.toString('base64')
    const id_hotel= parseInt(req.body.id_hotel)
    // }
    roomModel.insertRoom(nbr_pers, nbr_lit1, nbr_lit2, nbr_douche, nbr_tele, prix, img_chambre,
        id_hotel, (err, result) => {
        if (err) {
            return res.send(err);
        }
        return res.json(result);
    })
}

//update a room
const updateRoom = (req, res) => {
    const data = {
        nbr_pers: req.body.nbr_pers,
        nbr_lit1: req.body.nbr_lit1,
        nbr_lit2:req.body.nbr_lit2,
        nbr_douche:req.body.nbr_douche,
        nbr_tele: req.body.nbr_tele,
        prix: req.body.prix,
        img_chambre: req.file.buffer.toString('base64')
    }
    roomModel.updateRoom(data, req.params.id, (err, result) => {
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(result);
    })
}

//delete a room
const deleteRoom = (req, res) => {
    roomModel.deleteRoom(req.params.id, (err, result) => {
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(result);
    })
}

module.exports = {
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom
}