const mongoose = require("mongoose")

const enquirySchema = new mongoose.Schema({
    name:{type:String,default:""},
    email:{type:String,default:""},
    contact:{type:Number,default:0},
    message:{type:String,default:""},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()},
})

module.exports = new mongoose.model("enquirys",enquirySchema)
