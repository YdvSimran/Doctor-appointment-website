const userModel=require('../models/usermodels');
const bcrypt=require("bcryptjs");
const JWT =require("jsonwebtoken");
const doctorModel =require("../models/doctorModel");
const appointmentModel= require('../models/appointmentModel');
const moment = require("moment");


//register
const registerController= async (req,res)=>{
               try {
                 const exisitingUser =await userModel.findOne({email:req.body.email});
                 if(exisitingUser){
                              return res.status(200).send({meassage:'user already existed',success:false});
                 } 
                 const password =req.body.password
                 const salt =await bcrypt.genSalt(10)
                 const hasedPassword =await bcrypt.hash(password,salt);
                 req.body.password=hasedPassword;
                 const newUser =new userModel(req.body);
                 await newUser.save();
                 res.status(201).send({meassage:'register successfully done', success: true})


               } catch (error) {
                   console.log(error)
                   res.status(500).send({success:false , message:`${error.message}`});           
               }
}


const loginController= async(req,res)=>{
                 try {
                              const user =await userModel.findOne({email:req.body.email});
                              if(!user){
                                             return res.status(200).send({message:"usernot found",success:false});
                              }
                              const isMatch = await bcrypt.compare(req.body.password,user.password)
                              if(!isMatch){
                                             return res.status(200).send({message:"invalid email or password", success:false});
                              }
                              const token =JWT.sign({id:user._id},
                                             process.env.JWT_TOKEN,
                                             {expiresIn:"1d",});
                              res.status(200).send({message:"login success",success:true,token});
                              
               } catch (error) {
                             console.log(error) 
                             res.status(500).send({message:`${error.message}`});
               }
}

const authController=async(req,res)=>{
 try {
  const user = await userModel.findById({_id:req.body.userId})
  user.password=undefined;
  if(!user){
    return res.status(200).send({
      message:'user not found',
      success:false
    })
  }else{
    res.status(200).send({
      success:true,
      data:user,
    })
  }
 } catch (error) {
  console.log(error);
  res.status(500).send({
    message:'auth error',success:false,error
  })
 }
}

//apply doctor
const applyDoctorController= async(req,res)=>{
  try {
    const newDoctor =await doctorModel({...req.body , status:'pending'})
    await newDoctor.save()
    const adminUser= await userModel.findOne({isAdmin:true})
    const notification =adminUser.notification
    notification.push({
      type:'apply-doctor-request',
      message:`${newDoctor.firstName} ${newDoctor.lastName} has applied for a Doctor Account`,
      data:{
        doctorId:newDoctor._id,
        name:newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath:' /admin/doctors',
      },
    })
    await userModel.findByIdAndUpdate(adminUser._id,{notification})
    res.status(201).send({
      success:true,
      message:'Doctor Account Applied'
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:"error while applying for doctor"
    })
  }
}
//notification ctrl
const getAllNotificationController= async(req,res)=>{
  try {
    const user= await userModel.findOne({_id:req.body.userId})
    const seennotification= user.seennotification;
    const notification =user.notification;
    seennotification.push(...notification)
    user.notification=[];
    user.seennotification=notification
    const updatedUser= await user.save();
    res.status(200).send({
      success:true,
      message:'all notification marked are read',
      data:updatedUser,
      
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message:'Error in notification',
      success:false,
      error,
    })
  }
}

const deleteAllNotificationController=async(req,res)=>{
  try {
    const user=await userModel.findOne({_id:req.body.userId})
    user.notification=[]
    user.seennotification=[]
    const updatedUser= await user.save();
    updatedUser.password=undefined;
    res.status(200).send({
      success:true,
      message:'notification is deleted successfully',
      data:updatedUser,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:'unable to delete all notifications',
      error,
    })
    
  }
}

//GET 
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "Docots Lists Fetched Successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Errro WHile Fetching DOcotr",
    });
  }
};

const bookappointmentController =async(req,res)=>{
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status='pending';
    const newAppointment =new appointmentModel(req.body)
    await  newAppointment.save()
    const user =await userModel.findOne({_id:req.body.doctorInfo.userId})
    user.notification.push({
      type:'new-appointment-requets',
      message:`a new appointment request from ${req.body.userInfo.name}`,
onClickPath:'/user/appointments'
    })
    await user.save()
    res.status(200).send({
      success:true,
      message:'Apointments boook successfullly',
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Errro WHile Fetching DOcotr",
    });
  }
}

const bookingAvaliabilityController=async(req,res)=>{
  try {
    const date = moment(req.body.date, "DD-MM-YY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .add(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not Availibale at this time",
        success: true,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointments available",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Booking",
    });
  }
}

const userAppointmentController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: "Users Appointments Fetch SUccessfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In User Appointments",
    });
  }
};


module.exports={loginController, registerController,authController,applyDoctorController,
  getAllNotificationController,bookappointmentController,
  bookingAvaliabilityController,
  deleteAllNotificationController,getAllDoctorsController
,userAppointmentController};