import mongoose,{model, Schema} from "mongoose";

const userSChma = Schema({
     name:{
        type:String,
        required:true,
     },
     email:{
      type:String,
      required:true,
      unique:true,
     },
     password:{
      type:String,
      required:true
     },
     role:{
        type:String,
        enum:["user","admin"],
        default:'user'
     }
},{timestamp:true})

export default  model('User',userSChma)