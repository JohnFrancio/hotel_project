const db = require('../connexion/db');

// get all services  from database
const getAllServices = (result) => {
    db.query('SELECT * FROM service', (err, results) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
            result(null, results);
        }
    })
}

//get service by id from database
const getServiceById = (id, result) => {
    db.query('SELECT * FROM service WHERE id_service = ?', [id], (err, results) => {
        if(err){
            console.log(err);
        }else{
            console.log(result);
            result(null, results);
        }
    })
}

//insert data into service
const insertService = (data, result) => {
    db.query('INSERT INTO service SET?', [data], (err, results) => {
        if(err){
            console.log(err);
            console.log(err.sqlMessage);
        }else{
            console.log(results);
            result(null, results);
        }
    })
}

//update data from service by id
const updateService = (data, id, result) => {
    db.query('UPDATE service SET? WHERE id_service =?', [data, id], (err, results) => {
        if(err){
            console.log(err);
        }else{
            console.log(results);
            result(null, results);
        }
    })
}

//delete data from service by id
const deleteService = (id, result) => {
    db.query('DELETE FROM service WHERE id_service =?', [id], (err, results) => {
        if(err){
            console.log(err);
        }else{
            console.log(results);
            result(null, results);
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