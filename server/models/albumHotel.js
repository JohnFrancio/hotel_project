const db = require('../connexion/db')

//get album from database
const getAllPic = (result) => {
    db.query('SELECT * FROM image', (err, results) => {
            if (err) {
                return result(err);
            }
            else {
                return result(null, results);
            }
        });
};

//get album from database by id
const getPicById = (id, result) => {
    db.query('SELECT * FROM image WHERE id_img =?', [id], (err, results) => {
            if (err) {
                return result(err);
            }
            else {
                return result(null, results);
            }
        });
};

//insert album into database
const insertPic = async (img, id_hotel, result) => {
    for(let i in img){
        db.query('INSERT INTO image(img, id_hotel) VALUES(?, ?)', [img[i], id_hotel], (err, results) => {
            if (err) {
                return result(err);
            }
            else {
                return result(null, results);
            }
        })
    }
};


//delete album from database
const deletePic = async (id, result) => {
    db.query('DELETE FROM image WHERE id_img =?', [id], (err, results) => {
            if (err) {
                return result(err);
            }
            else {
                return result(null, results);
            }
        });
};

module.exports = {
    getAllPic,
    getPicById,
    insertPic,
    deletePic
};