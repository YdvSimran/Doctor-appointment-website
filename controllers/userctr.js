const userModel=require('../models/usermodels');
const bcrypt=require("bcryptjs");
const JWT =require("jsonwebtoken");

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
module.exports={loginController, registerController,authController};