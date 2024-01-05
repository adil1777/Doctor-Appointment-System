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


module.exports= {getAllUserController,getAllDoctorController};