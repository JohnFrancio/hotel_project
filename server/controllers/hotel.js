const hotelModel = require('../models/hotel');

//get all hotels
const getAllHotels = (req, res) => {
    hotelModel.getAllHotels((err,result)=>{
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(result);
    })
};

//get hotel by id
const getHotelById = (req, res) => {
    hotelModel.getHotelById(req.params.id, (err, result) => {
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(result);
    })
}

//create a hotel
const createHotel = (req, res) => {
    hotelModel.insertHotel(req.body, (err, result) => {
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
        mdp_hotel: req.body.mdp_hotel
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