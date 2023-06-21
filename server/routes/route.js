const userController = require('../controllers/user');
const hotelController = require('../controllers/hotel');
const serviceController = require('../controllers/service');
const express = require("express");
const router = express.Router();

// routes for users
router.get('/user', userController.getAllUsers);
router.get('/user/:id', userController.getUserById);
router.post('/user', userController.createUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

// routes for hotels
router.get('/hotel', hotelController.getAllHotels);
router.get('/hotel/:id', hotelController.getHotelById);
router.post('/hotel', hotelController.createHotel);
router.put('/hotel/:id', hotelController.updateHotel);
router.delete('/hotel/:id', hotelController.deleteHotel);

//routes for services
router.get('/service', serviceController.getAllServices);
router.get('/service/:id', serviceController.getServiceById);
router.post('/service', serviceController.insertService);
router.put('/service/:id', serviceController.updateService);
router.delete('/service/:id', serviceController.deleteService);

module.exports = router;