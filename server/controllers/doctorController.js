 const doctorModel = require('../models/doctorModel');
 
 //GET DOCTOR DETAIL
 const getDoctorInfoController =async(req,res)=>{
    try{
        const doctor = await doctorModel.findOne({userId:req.body.userId});
        res.status(200).send({
            success:true,
            message:'doctor details fetch successfully',
            data:doctor,
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while fetching Doctor Info",
            error,
        })
    }

 };

 //UPDATE DOCTOR PROFILE
 const updateDoctorProfileCtrl= async(req,res)=>{
  try{
     const doctor = await doctorModel.findOneAndUpdate({userId:req.body.userId},req.body);
     res.status(201).send({
        success:true,
        message:"Update doctor Profile Successfully",
        data:doctor,
     });
     
  }catch(error){
    console.log(error);
    res.status(500).send({
        success:false,
        message:"Update doctor profile issuess",
        error,
    })
  }
 };

 module.exports = {getDoctorInfoController,updateDoctorProfileCtrl}; 