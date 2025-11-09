const mongoose =require("mongoose");
const userModel = require("../user/userModel")
const studentModel=require("./studentModel");
const bcrypt = require("bcrypt");
const register = (req,res)=>{
    var errMsgs = []
    if(!req.body.name){
        errMsgs.push("name is required!!")
    }
    if(!req.body.password){
        errMsgs.push("password is required!!")
    }
    if(!req.body.email){
        errMsgs.push("email is required!!")
    }
    if(!req.body.phone){
        errMsgs.push("phone is required!!")
    }
    if(!req.body.address){
        errMsgs.push("address is required!!")
    }
    
    if(errMsgs.length>0){
        res.send({
            status:422,
            success:false,
            message:errMsgs
        })
    }
    else{
        
        userModel.findOne({email:req.body.email})
        .then((userdata)=>{
            console.log("userdata",userdata);
            if(userdata == null){
                //new user add
                let userObj  = new userModel()
                userObj.name = req.body.name
                userObj.email = req.body.email
                userObj.password = bcrypt.hashSync(req.body.password,10 )
                userObj.userType = 3
                userObj.save()
                .then(async(newuserdata)=>{
                    let StudentObj = new studentModel()
                    StudentObj.userId = newuserdata._id
                    StudentObj.name = req.body.name
                    StudentObj.email = req.body.email
                    StudentObj.password = req.body.password
                    StudentObj.phone = req.body.phone
                    StudentObj.address = req.body.address
                    StudentObj.save()
                    .then((Studentdata)=>{  
                        res.send({
                            status:200,
                            success:true,
                            message:"Student Register!!!",
                            data:Studentdata,
                            userdata:newuserdata
                            
                        })    
                    })
                    .catch((err)=>{
                        console.log(err);
                        
                        res.send({
                            status:500,
                            success:false,
                            message:"internel server error!!"
                        })
                    })


                })
                  .catch((err)=>{
                        console.log(err);
                        
                        res.send({
                            status:500,
                            success:false,
                            message:"internel server error!!"
                        })
                    })
                


            }
            else{
                res.send({
                status:422,
                success:false,
                message:"user already exists with same email!!"
            })
            }
            
        })
        .catch((err)=>{
            console.log(err);
            
            res.send({
                status:500,
                success:false,
                message:"internel server error!!"
            })
        })
    }
}

const getall = async(req,res)=>{
            var totalstudents = await studentModel.countDocuments()
            console.log("total students",totalstudents);
            
            studentModel.find(req.body)   
            .populate("userId")      
            .then((studentdata)=>{
                res.send({
                    status:200,
                    success:true,
                    messsage:"Data loaded!!",
                    data:studentdata
                })
            })
            .catch((err)=>{
                res.send({
                    status:500,
                    success:false,
                    messsage:"Something went wrong!!"
                })
            })

}
module.exports ={register,getall}