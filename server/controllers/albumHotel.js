const albumHotelModel = require('../models/albumHotel');

//get all hotels
const getAllPic = (req, res) => {
    albumHotelModel.getAlPic((err,results)=>{
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(results);
    })
};

//get hotel by id
const getPicById = (req, res) => {
    albumHotelModel.gePicById(req.params.id, (err, results) => {
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(results);
    })
}

//create a hotel
const createPic = (req, res) => {
    let output = []
    for(let i in req.files){
        let test = req.files[i].buffer.toString('base64')
        output.push(test)
    }
    let id_hotel=req.body.id_hotel
    albumHotelModel.insertPic(output, id_hotel, (err, result) => {
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(result);
    })
}


//delete a hotel
const deletePic = (req, res) => {
    albumHotelModel.deletePic(req.params.id, (err, result) => {
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(result);
    })
}

module.exports = {
    getAllPic,
    getPicById,
    createPic,
    deletePic
}