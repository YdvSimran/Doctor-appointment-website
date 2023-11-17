const express =require("express");
const colors =require("colors");
const morgan =require("morgan");
const dotenv =require("dotenv");
const connectDB =require("./config/db");
dotenv.config();

//mongo connect
connectDB();


const app=express()

//middleware
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user" ,require("./routes/useroutes"));
app.use('/api/v1/admin',require('./routes/adminRoutes'));

//port
const port=process.env.PORT
app.listen(port,()=>{
               console.log(`${port}`);
});
