const enquiryModel = require("./enquiryModel")

const add = (req, res) => {
    var errMsgs = [];

    if (!req.body.name ) {
        errMsgs.push("name  is required!!");
    }
    if (!req.body.email) {
        errMsgs.push("email is required!!");
    }
    if (!req.body.contact) {
        errMsgs.push("contact is required!!");
    }
    if (!req.body.message) {
        errMsgs.push("message is required!!");
    }
    if (errMsgs.length > 0) {
        return res.send({
            status: 422,
            success: false,
            message: errMsgs
        });
    }
              let enquiryObj = new enquiryModel();
                enquiryObj.name = req.body.name;
                enquiryObj.email = req.body.email;
                enquiryObj.contact = req.body.contact;
                enquiryObj.message = req.body.message;
                enquiryObj.save()
                    .then((enquirydata) => {
                        res.send({
                            status: 200,
                            success: true,
                            message: "enquiry data inserted!!",
                            data: enquirydata
                        });
                    })
                    .catch((err) => {
                        res.send({
                            status: 500,
                            success: false,
                            message: "Something went wrong!!"
                        });
                    });
            
       
}
const getall = async(req,res)=>{
            var totalenquirys = await enquiryModel.countDocuments()
            console.log("total enquirys",totalenquirys);
            
            enquiryModel.find(req.body)        
            .then((enquirydata)=>{
                res.send({
                    status:200,
                    success:true,
                    messsage:"Data loaded!!",
                    data:enquirydata
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
const getSingle = (req,res)=>{
            var errMsgs = []
            if(!req.body._id)
                errMsgs.push("_id is required")
             if(errMsgs.length>0){
                    res.send({
                        status:422,
                        success:false,
                        message:errMsgs
                    })
            }
            else{
                enquiryModel.findOne({_id:req.body._id})
                .then((enquirydata)=>{
                    if(enquirydata == null){
                         res.send({
                            status:404,
                            success:false,
                            message:"data not found!!"
                        })
                    }
                    else{
                        res.send({
                            status:200,
                            success:true,
                            message:"data loaded!!",
                            data:enquirydata
                        })
                    }
                    

                })
                 .catch((err)=>{
                        res.send({
                            status:500,
                            success:false,
                            messsage:"Something went wrong!!"
                        })
                    })
            }
}
const deleteOne = (req,res)=>{
            var errMsgs = []
            if(!req.body._id)
                errMsgs.push("_id is required")
             if(errMsgs.length>0){
                    res.send({
                        status:422,
                        success:false,
                        message:errMsgs
                    })
            }
            else{
                enquiryModel.findOne({_id:req.body._id})                
                .then((enquirydata)=>{
                    if(enquirydata == null){
                         res.send({
                            status:404,
                            success:false,
                            message:"data not found!!"
                        })
                    }
                    else{
                    enquirydata.deleteOne().then((deletedData)=>{
                         res.send({
                            status:200,
                            success:true,
                            message:"data Deleted successfull!!",
                            data:deletedData
                        })
                    }).catch(()=>{
                        res.send({
                            status:402,
                            success:false,
                            message:"Data Not Deleted successfull!!"
                        })
                    })

                    }
                    

                })
                 .catch((err)=>{
                        res.send({
                            status:500,
                            success:false,
                            messsage:"Something went wrong!!"
                        })
                    })
            }
}
const changeStatus = (req,res)=>{
            var errMsgs = []
            if(!req.body._id)
                errMsgs.push("_id is required")
             if(errMsgs.length>0){
                    res.send({
                        status:422,
                        success:false,
                        message:errMsgs
                    })
            }
            else{
             
                enquiryModel.findOne({_id:req.body._id})
                .then((enquirydata)=>{
                    if(enquirydata == null){
                         res.send({
                            status:404,
                            success:false,
                            message:"data not found!!"
                        })
                    }
                    else{
                        enquirydata.status=!enquirydata.status                       
                        enquirydata.save().then((changeStatus)=>{
                             res.send({
                            status:200,
                            success:true,
                            message:"data deleted!!",
                            data:changeStatus
                        })
                        }).catch(()=>{
                            res.send({
                            status:422,
                            success:false,
                            message:"data not deleted!!"
                            
                        })
                        })

                        
                       
                    }
                    

                })
                 .catch((err)=>{
                        res.send({
                            status:500,
                            success:false,
                            messsage:"Something went wrong!!"
                        })
                    })
            }
}
const update = (req,res)=>{
            var errMsgs = []
            if(!req.body._id)
                errMsgs.push("_id is required")
             if(errMsgs.length>0){
                    res.send({
                        status:422,
                        success:false,
                        message:errMsgs
                    })
            }
            else{
                enquiryModel.findById(req.body._id)
                .then((enquirydata)=>{
                     if (!enquirydata) {
      return res.status(404).send({ success: false, message: "enquiry not found!!" });
    }
                    else{

                        if(req.body.name){
                            enquirydata.name=req.body.name
                        }
                        if(req.body.email){
                            enquirydata.email=req.body.email
                        }
                        if(req.body.contact){
                            enquirydata.contact=req.body.contact
                        }
                        if(req.body.message){
                            enquirydata.message=req.body.message
                        }
                       
                        enquirydata.save().then((updatedData)=>{
                             res.send({
                            status:200,
                            success:true,
                            message:"data Updated!!",
                            data:updatedData
                        })
                        }).catch(()=>{
                            res.send({
                            status:422,
                            success:false,
                            message:"data not Updated!!"
                            
                        })
                        })
  
                    }
                })
                 .catch((err)=>{
                        res.send({
                            status:500,
                            success:false,
                            messsage:"Something went wrong!!"
                        })
                    })
            }
}
module.exports ={add,getSingle,update,deleteOne,changeStatus,getall}