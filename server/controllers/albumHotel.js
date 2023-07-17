const albumHotelModel = require('../models/albumHotel');

//get all hotels
const getAllPic = (req, res) => {
    albumHotelModel.getAllPic((err,results)=>{
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(results);
    })
};

//get hotel by id
const getPicById = (req, res) => {
    albumHotelModel.getPicById(req.params.id, (err, results) => {
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(results);
    })
}

//create a hotel
const createPic = (req, res) => {
    let output = []
    for(var i = 0; i < req.files.length; i++){
        let test = req.files[i].buffer.toString('base64')
        output.push(test)
    }
    const id_hotel=req.body.id_hotel
    albumHotelModel.insertPic(output, id_hotel, (err, result) => {
        if (err) {
            throw err;
            return res.send(err);
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