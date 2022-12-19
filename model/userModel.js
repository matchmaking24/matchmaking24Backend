const mongoose = require('mongoose')
const userScheema = new mongoose.Schema({
    name:{
        type:String,
        required:true, 
    },
    email:{  
        type:String,
        required:true,
    },
    phone:{
        type:Number,
         
    },
    address:{
        type:String,

    },
    img:{
        type:String
    },
    gender:{
        type:String
    },
    age:Number,
    lokingFor:[],
    membershipType:{
        type:String
    },
    country:String,
    city:String,
    age:Number,
    language:[],
    higherQualification:String,
    fieldOfStudy:String,
    collageName:String,
    schoolName:String,
    industry:String,
    companyName:String,
    day:String,
    year:String,
    month:String,
    telegram:String,
    twiter:String,
    instagram:String,
    role:{
        type:String,
        default:"User"
    },
    profileType:{
        type:String,
        default:"Basic"
    },





},{timestamps:true})

module.exports = mongoose.model("user",userScheema);