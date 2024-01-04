const userModel = require("../models/userModels");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

//Register Controller
const registerController =async(req,res)=> {
    try{
        const existingUser = await userModel.findOne({email: req.body.email});
        if(existingUser){
            return res.status(200).send({
                success:false,
                message: "User Already Exist",
            });
        }
        const password=req.body.password;
        const salt= await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        req.body.password=hashedPassword;
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({
            message:"Register Successfully",
            success:true,
        });

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:`Register Controller ${error.message}`
        });
    }
};

//LOGIN CONTROLLER
const loginController =async(req,res)=> {
    try{
        const user = await userModel.findOne({email:req.body.email});
        if(!user){
            return res.status(200).send({
                success:false,
                message:"User not found",
            });
        }
        const isMatch = await bcrypt.compare(req.body.password,user.password);
        if(!isMatch){
            return res.status(200).send({
                success:false,
                message:"Invalid Email or Password",
            });
        }
        const token =jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.status(200).send({
            success:true,
            message:"Login Successfull",
            token,
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:`Error in Login CTRL ${error.message}`,

        })
    }
};

//AuthController || GETUSERDATA
 const AuthController =async(req,res)=>{
    try{
        const user = await userModel.findById({_id:req.body.userId});
        user.password = undefined;
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not found"
            });
        }else{
              res.status(200).send({
                success:true,
                data:user,
            })
        }

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"auth error",
            error,
        })
    }
 };



module.exports ={loginController , registerController ,AuthController};