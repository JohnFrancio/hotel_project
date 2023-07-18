const userController = require('../controllers/user');
const hotelController = require('../controllers/hotel');
const authController = require('../controllers/auth');
const roomController = require('../controllers/room');
const albumController = require('../controllers/albumHotel');
const avisController = require('../controllers/avis');
const reservationController = require('../controllers/reservation');

const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage()
const upload = multer({ storage })

// routes for users
router.get('/user', userController.getAllUsers);
router.get('/user/:id', userController.getUserById);
router.post('/user',upload.single('img_user'), userController.createUser);
router.put('/user/:id',upload.single('img_user'), userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

// routes for hotels
router.get('/hotel', hotelController.getAllHotels);
router.get('/hotel/:id', hotelController.getHotelById);
router.post('/hotel', upload.single("img_hotel"), hotelController.createHotel);
router.put('/hotel/:id', upload.single("img_hotel"), hotelController.updateHotel);
router.delete('/hotel/:id', hotelController.deleteHotel);


//routes for auth
router.post('/auth', authController.checkAuth);

//routes for room
router.get('/room', roomController.getAllRoom)
router.get('/room/chambre/:id', roomController.getRoomByIdChambre)
router.get('/room/:id', roomController.getRoomById);
router.post('/room',upload.single('img_chambre'), roomController.createRoom);
router.put('/room/:id', upload.single('img_chambre'), roomController.updateRoom);
router.delete('/room/:id', roomController.deleteRoom);

//routes for album
router.get('/pic', albumController.getAllPic);
router.get('/pic/:id', albumController.getPicById);
router.post('/pic',upload.array('image'), albumController.createPic);
router.delete('/pic/:id', albumController.deletePic);

//routes for reservation
router.get('/reservation/hotel/:id', reservationController.getReservationByHotelid);
router.get('/reservation/user/:id', reservationController.getReservationByUserid);
router.post('/reservation', reservationController.createReservation);
router.get('/reservation', reservationController.getReservation);
router.put('/reservation/:id', reservationController.updateReservation);
router.delete('/reservation/:id', reservationController.deleteReservation);

//routes for avis
router.get('/avis', avisController.getAvis);
router.get('/avis/:id', avisController.getAvisHotelId);
router.post('/avis', avisController.insertAvis);
router.delete('/avis/:id', avisController.deleteAvis);

module.exports = router;