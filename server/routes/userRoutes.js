const express = require("express");
const { loginController, registerController, AuthController, ApplyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorsController, bookAppointmentController, bookingAvailabilityController } = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");

//Router object
const router = express.Router();

//LOGIN || POST
router.post('/login' , loginController);

//REGISTER || POST
router.post('/register', registerController);

//Auth || getUserData || POST
router.post('/getUserData' , authMiddleware , AuthController)

//Apply Doctor || POST
router.post('/apply-doctor' , authMiddleware ,ApplyDoctorController )

//Notification Doctor || POST
router.post('/get-all-notification' , authMiddleware ,getAllNotificationController );

// Delete Notification  || POST
router.post('/delete-all-notification' , authMiddleware ,deleteAllNotificationController );

//GET ALL DOCTORS
router.get('/getAllDoctors' , authMiddleware,getAllDoctorsController);

//BOOK APPOINTMENT 
router.post('/book-appointment',authMiddleware,bookAppointmentController);

//BOOKING AVAILABILITY
router.post('/booking-availability',authMiddleware,bookingAvailabilityController);

module.exports = router;