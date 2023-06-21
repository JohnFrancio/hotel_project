const ServiceModel = require('../models/service')

const getAllServices = (req, res) => {
    ServiceModel.getAllServices((err, results) => {
        if(err){
            res.send(err);
        }else{
            res.json(results);
        }
    })
}

const getServiceById = (req, res) => {
    ServiceModel.getServiceById(req.params.id, (err, results) => {
        if(err){
            res.send(err);
        }else{
            res.json(results);
        }
    })
}

const insertService = (req, res) => {
    const data = {
        id_cate : req.body.id_cate,
        id_hotel : req.body.id_hotel,
        description: req.body.description,
        prix : req.body.prix
    }
    ServiceModel.insertService(data, (err, results) => {
            if(err){
                res.send(err);
            }else{
                res.json(results);
            }
        })
}

const updateService = (req, res) => {
    const data = {
        description: req.body.description,
        prix : req.body.prix
    }
    ServiceModel.updateService(data, req.params.id, (err, results) => {
        if(err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

const deleteService = (req, res) => {
    ServiceModel.deleteService(req.params.id, (err, results) => {
        if(err){
            res.send(err);
        }else{
            res.json(results);
        }
    })
}

module.exports = {
    getAllServices,
    getServiceById,
    insertService,
    updateService,
    deleteService
}