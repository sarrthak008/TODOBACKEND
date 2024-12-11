import mongoose, { Schema, model } from "mongoose";

const taskSchma = Schema({
   title: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true
   },
   category:{
      type:String,
      required:true
   },
   isComplete: {
      type: Boolean,
      default: false
   }
}, { timestamp: true })

export default model('Task', taskSchma)