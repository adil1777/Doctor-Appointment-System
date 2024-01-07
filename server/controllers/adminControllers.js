const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");

const getAllUserController = async(req,res)=>{
    try{
        const users = await userModel.find({});
        users.password = undefined;
        res.status(200).send({
            success:true,
            message:"User Data list",
            data:users,
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while fetching user Detail",
            error,
        })
    }

};

// GET ALL DOCTOR DETAILS
const getAllDoctorController =async(req,res)=>{
    try{
        const doctors=await doctorModel.find({});
        res.status(200).send({
            success:true,
            message:"Doctors Data list ",
            data:doctors,
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while fetching doctors Detail",
            error,
        })
    }

};

 //Chane Account Status Controller 
const changeAccountStatusController =async(req,res)=>{
  try{
    const {doctorId,status} =req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId,{status});
    

    const user = await userModel.findOne({_id:doctor.userId})
    const notification = user.notification;
    notification.push({
        type:"doctor-account-request-updated",
        message:`Your doctor account request has ${status}  `,
        onClickPath:'/notification'
    });
    
    user.isDoctor = status === "approved" ? true : false;
    await user.save();
    res.status(201).send({
        success:true,
        message:'Account Status Updated',
        data: doctor,
    });

  }catch(error){
    console.log(error);
    res.status(500).send({
        success:false,
        message:"Error in Account Status",
        error
    })
  }
};
module.exports= {getAllUserController,getAllDoctorController,changeAccountStatusController};