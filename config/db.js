const mongoose = require("mongoose");
const dotenv =require("dotenv");
dotenv.config();
const colors =require("colors");
const connectDB= async()=>{
               try {
                    await mongoose.connect(process.env.MONGO_URL);
                    console.log(`${mongoose.connection.host}`)
               } catch (error) {
                      console.log(`${error}`);        
               }
}
module.exports=connectDB;