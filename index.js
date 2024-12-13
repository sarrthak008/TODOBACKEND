import express from "express";
import cors from 'cors'
import dotenv from "dotenv"
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;



//create functions routes data
import connectDB from "./config/connect.js";
import router from "./routers/auth.js";
import taskRouter from "./routers/task.js";

//midleware.
app.use(express.json())
app.use(cors({
     methods: ['GET', 'POST', 'PUT', 'DELETE'], 
     allowedHeaders: ['Content-Type'], 
}))
app.use('/api/auth',router);
app.use('/api/task',taskRouter)



app.get('/health',(req,res)=>{
    res.send('server is healthy');
})




app.use('*',(req,res)=>{
     res.send(`${req.path} not found please check your path`);
})

app.listen(PORT,()=>{
     console.log(`server is listen on ${PORT}`);
     connectDB()
})