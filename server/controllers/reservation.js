const reservationModel = require('../models/reservation');

//get reservation by id hotel
const getReservationByHotelid = (req, res) => {
    reservationModel.getReservationByHotelid(req.params.id, (err,results)=>{
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(results);
    })
};

const getReservation = (req, res) => {
    reservationModel.getReservation((err,results)=>{
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(results);
    })
};

//get reservation by id user
const getReservationByUserid = (req, res) => {
    reservationModel.getReservationByUserid(req.params.id, (err, results) => {
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(results);
    })
}

//create a reservation
const createReservation = (req, res) => {
    const data = {
        id_user: req.body.id_user,
        id_chambre: req.body.id_chambre,
        reserver_pour: req.body.reserver_pour,
        nbr_jour: req.body.nbr_jour,
        paye: "non"
    }
    reservationModel.insertReservation(data, (err, result) => {
        if (err) {
            return res.send(err);
        }
        return res.json(result);
    })
}

const updateReservation = (req, res) => {
    reservationModel.updateReservation(req.params.id, (err, result) => {
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(result);
    })
}

//delete a reservation
const deleteReservation = (req, res) => {
    reservationModel.deleteRoom(req.params.id, (err, result) => {
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(result);
    })
}

module.exports = {
    getReservationByHotelid,
    getReservationByUserid,
    getReservation,
    createReservation,
    updateReservation,
    deleteReservation
}