const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/QuestionValue")
.then(()=>{
    console.log("database connected!!");
    
})
.catch((err)=>{
    console.log("err while connecting db",err);
    
})
