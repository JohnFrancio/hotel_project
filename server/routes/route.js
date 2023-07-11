const userController = require('../controllers/user');
const hotelController = require('../controllers/hotel');
const authController = require('../controllers/auth');
const express = require("express");
const router = express.Router();
const multer = require("multer");

// const storage = multer.diskStorage({
// 	destination:'../upload/images/',
// 	filename: (req, file, cb)=>{
// 		cb(null, Date.now() + '..' + path.extname(file.originalname))
// 	}
// })

// const upload = multer({
// 	storage:storage,
// 	filetype: function(req, file, cb){
// 		if(!file.originalname.match(/\.(jpg|png|jpeg|gif)$/)){
// 			req.fileValidationError = "Errer";
// 			return cb(new Error("error"), false);
// 		}
// 	}
// }).single("profil_pic")

const upload = multer({storage:multer.memoryStorage()}).single("profil_pic")

// routes for users
router.get('/user', userController.getAllUsers);
router.get('/user/:id', userController.getUserById);
router.post('/user',upload, userController.createUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

// routes for hotels
router.get('/hotel', hotelController.getAllHotels);
router.get('/hotel/:id', hotelController.getHotelById);
router.post('/hotel', upload, hotelController.createHotel);
router.put('/hotel/:id', hotelController.updateHotel);
router.delete('/hotel/:id', hotelController.deleteHotel);


//routes for auth
router.post('/auth', authController.checkAuth);

module.exports = router;