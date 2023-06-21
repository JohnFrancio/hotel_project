const hotelModel = require('../models/hotel');

//get all hotels
const getAllHotels = (req, res) => {
    hotelModel.getAllHotels((err,result)=>{
        if(err){
            res.send(err);
        }else{
            res.json(result);
        }
    })
};

//get hotel by id
const getHotelById = (req, res) => {
    hotelModel.getHotelById(req.params.id, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    })
}

//create a hotel
const createHotel = (req, res) => {
    hotelModel.insertHotel(req.body, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    })
}

//update a hotel
const updateHotel = (req, res) => {
    const data = {
        nom_hotel: req.body.nom_hotel,
        adresse_hotel: req.body.adresse_hotel,
        contact_hotel: req.body.contact_hotel,
        longitude: req.body.longitude,
        latitude: req.body.latitude
    }
    hotelModel.updateHotel(data, req.params.id, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    })
}

//delete a hotel
const deleteHotel = (req, res) => {
    hotelModel.deleteHotel(req.params.id, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    })
}

module.exports = {
    getAllHotels,
    getHotelById,
    createHotel,
    updateHotel,
    deleteHotel
}