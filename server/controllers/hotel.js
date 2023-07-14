const hotelModel = require('../models/hotel');

//get all hotels
const getAllHotels = (req, res) => {
    hotelModel.getAllHotels((err,results)=>{
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(results);
    })
};

//get hotel by id
const getHotelById = (req, res) => {
    hotelModel.getHotelById(req.params.id, (err, results) => {
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(results);
    })
}

//create a hotel
const createHotel = (req, res) => {
    console.log(req.file)
    const data = {
        nom_hotel: req.body.nom_hotel,
        adresse_hotel: req.body.adresse_hotel,
        nif_hotel:req.body.nif_hotel,
        email_hotel:req.body.email_hotel,
        contact_hotel: req.body.contact_hotel,
        mdp_hotel: req.body.mdp_hotel,
        description:req.body.description,
        img_hotel: req.file.buffer.toString('base64')
    }
    hotelModel.insertHotel(data, (err, result) => {
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(result);
    })
}

//update a hotel
const updateHotel = (req, res) => {
    const data = {
        nom_hotel: req.body.nom_hotel,
        adresse_hotel: req.body.adresse_hotel,
        contact_hotel: req.body.contact_hotel,
        nif_hotel: req.body.nif_hotel,
        description: req.body.description,
        img_hotel: req.file.buffer.toString('base64')
    }
    hotelModel.updateHotel(data, req.params.id, (err, result) => {
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(result);
    })
}

//delete a hotel
const deleteHotel = (req, res) => {
    hotelModel.deleteHotel(req.params.id, (err, result) => {
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(result);
    })
}

module.exports = {
    getAllHotels,
    getHotelById,
    createHotel,
    updateHotel,
    deleteHotel
}