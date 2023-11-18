const doctorModel = require('../models/doctorModel');


const getDoctorInfoController =async(req,res)=>{
               try {
                  const doctor = await doctorModel.findOne({userId:req.body.userId})
                  res.status(200).send({
                              success:true,
                              message:'doctor data fetch success',
                              data:doctor,
                  })            
               } catch (error) {
                        console.log(error)
                        res.status(500).send({
                              success:false,
                              error,
                              message:'Error in Fetaching the Doctors Details'
                        })      
               }
}

const updateProfileController= async(req,res)=>{
      try {
         const doctor =await doctorModel.findOneAndUpdate({userId:req.body.userId},req.body)
         res.status(201).send({
            success:true,
            message:'Doctor Profile Udated',
            data:doctor,
         })   
      } catch (error) {
            console.log(error)
            res.status(500).send({
                  success:false,
                  
                  message:'Doctor Profile Update issues',
                  error,
            })    
      }
}

const getDoctorByIdController=async(req,res)=>{
      try {
         const doctor = await doctorModel.findOne({_id:req.body.doctorId}) 
         res.status(201).send({
            success:true,
            message:'single dr info fetched',
            data:doctor,
         })     
      } catch (error) {
            console.log(error)
            res.status(500).send({
                  success:false,
                  
                  message:'error in dr info',
                  error,
            }) 
      }
}

module.exports= {getDoctorInfoController,updateProfileController,getDoctorByIdController}