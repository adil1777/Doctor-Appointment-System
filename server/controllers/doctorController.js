const doctorModel = require("../models/doctorModel");
const appointmentModel = require('../models/appointmentModel');
const userModel = require("../models/userModels");

//GET DOCTOR DETAIL
const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "doctor details fetch successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Doctor Info",
      error,
    });
  }
};

//UPDATE DOCTOR PROFILE
const updateDoctorProfileCtrl = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Update doctor Profile Successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Update doctor profile issuess",
      error,
    });
  }
};

//GET SINGLE DOCTOR INFORMATION
const getDoctorByIdController = async (req, res) => {
    try {
      const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
      res.status(200).send({
        success: true,
        message: "Single Doc Info Fetched Successfully",
        data: doctor,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while fetching single doc info",
      });
    }
  };
  
//DOCTOR APPOINTMENT LIST CONTROLLER 
const doctorAppointmentsController = async(req,res)=>{
  try{
     const doctor = await doctorModel.findOne({userId:req.body.userId});
     const appointments = await appointmentModel.find({doctorId:doctor._id });

     res.status(200).send({
      success:true,
      message:'Doctor Appointments fetch Successfully',
      data:appointments,
     })

  }catch(error){
    console.log(error);
    res.status(500).send({
      successs:false,
      message:'Error in Doctor Appointment',
      error
    })
  }
}

//UPDATE APPOINTMENT STATUS
const updateAppointmentsStatusCtrl = async(req,res)=>{
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointments.userId });
    const notification = user.notification;
     notification.push({
      type: "status-updated",
      message: `your appointment has been updated ${status}`,
      onCLickPath: "/doctor-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In While Updating Appointment Status",
      error,
    });
  }
};

module.exports = {
  getDoctorInfoController,
  updateDoctorProfileCtrl,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateAppointmentsStatusCtrl
};
