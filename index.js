import express from "express";
import cors from 'cors'
import dotenv from "dotenv"
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;



//create functions routes data
import connectDB from "./config/connect.js";
import router from "./routers/auth.js";

//midleware.
app.use(express.json())
app.use(cors())
app.use('/api/auth',router);

app.use('/health',(req,res)=>{
    res.send('server is healthy');
})




app.use('*',(req,res)=>{
     res.send(`${req.path} not found please check your path`);
})

app.listen(PORT,()=>{
     console.log(`server is listen on ${PORT}`);
     connectDB()
})