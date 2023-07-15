const userController = require('../controllers/user');
const hotelController = require('../controllers/hotel');
const authController = require('../controllers/auth');
const roomController = require('../controllers/room');
const albumController = require('../controllers/albumHotel');
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
router.get('/room/:id', roomController.getRoomById);
router.post('/room',upload.single('img_chambre'), roomController.createRoom);
router.put('/room/:id', upload.single('img_chambre'), roomController.updateRoom);
router.delete('/room/:id', roomController.deleteRoom);

//routes for album
router.get('/pic', albumController.getAllPic);
router.get('/pic/:id', albumController.getPicById);
router.post('/pic',upload.array('image'), albumController.createPic);
router.delete('/pic/:id', albumController.deletePic);

module.exports = router;