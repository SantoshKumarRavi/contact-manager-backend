const mongoose=require("mongoose")
const Schema=mongoose.Schema

const contactschema = new Schema({
    name: String,
    email:String,
    phonenumber:Number,
    designation:String
  });

const contact = mongoose.model('contact',contactschema);
module.exports=contact