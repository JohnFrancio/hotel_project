const avisModel = require('../models/avis');

//get all avis
const getAvis = (req, res) => {
    avisModel.getAllRoom((err,results)=>{
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(results);
    })
};

const getAvisHotelId = (req, res) => {
    avisModel.getAvisHotelId(req.params.id, (err,results)=>{
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(results);
    })
};

//insert avis 
const insertAvis = (req, res) => {
    const data = {
        id_user: req.body.id_user,
        id_hotel: req.body.id_hotel,
        avis: req.body.avis
    }
    console.log(req.body.id_user,req.body.id_hotel,req.body.avis)
    avisModel.insertAvis(data, (err, results) => {
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(results);
    })
}

//delete a avis
const deleteAvis = (req, res) => {
    avisModel.deleteAvis(req.params.id, (err, result) => {
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(result);
    })
}

module.exports = {
    getAvis,
    getAvisHotelId,
    insertAvis,
    deleteAvis
}