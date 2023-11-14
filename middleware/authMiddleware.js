 const JWT =require("jsonwebtoken");
 const dotenv =require("dotenv");
 dotenv.config();

 module.exports=async(req,res,next)=>{
   try {
               const token =req.headers["authorization"].split(" ")[1]
               JWT.verify(token,  process.env.JWT_TOKEN ,(err,decode)=>{
                          if(err){
                                         return res.status(200).send({
                                                        message:'AUTH ',
                                                        success:false
                                         })
                          }else{
                                req.body.userId=decode.id ;
                                next();         
                          }
               })     
   } catch (error) {
         console.log(error) 
         res.status(401).send({
               message:"auth failed",
               success:false
         })     
   }
 }
