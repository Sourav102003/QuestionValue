const mongoose =require("mongoose");
const yearModel = require("./yearModel")
const paperModel = require("../paper/paperModel")
const getall = async(req,res)=>{
            var totalyears = await yearModel.countDocuments()
            console.log("total years",totalyears);
            
            yearModel.find(req.body)        
            .then((yeardata)=>{
                res.send({
                    status:200,
                    success:true,
                    messsage:"Data loaded!!",
                    data:yeardata
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
const getYearsByDepartment = (req, res) => {
    const departmentInput = req.body.department; 
    paperModel.distinct('year', { department:departmentInput })
        .then((years) => {
            res.send({
                status: 200,
                success: true,
                message: "Distinct years for department CSE and input year fetched successfully",
                data: years
            });
        })
        .catch((err) => {
            console.log(err);
            res.send({
                status: 500,
                success: false,
                message: "Failed to fetch years"
            });
        });
};


module.exports ={getall,getYearsByDepartment}