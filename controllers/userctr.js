const userModel=require('../models/usermodels');
const bcrypt=require("bcryptjs");
const JWT =require("jsonwebtoken");
const doctorModel =require("../models/doctorModel");

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

module.exports={loginController, registerController,authController,applyDoctorController,getAllNotificationController,deleteAllNotificationController};