const express = require("express");
const { loginController, registerController, AuthController } = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");

//Router object
const router = express.Router();

//LOGIN || POST
router.post('/login' , loginController);

//REGISTER || POST
router.post('/register', registerController);

//Auth || getUserData || POST
router.post('/getUserData' , authMiddleware , AuthController)

module.exports = router;