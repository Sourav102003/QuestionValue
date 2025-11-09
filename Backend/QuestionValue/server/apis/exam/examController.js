const mongoose =require("mongoose");
const paperModel = require("../paper/paperModel")
const examModel = require("./examModel")

const getexamByterm = (req, res) => {
    const termInput = req.body.name; 
    paperModel.distinct('exam', { term:termInput })
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
const getall = async(req,res)=>{
            var totalexams = await examModel.countDocuments()
            console.log("total exams",totalexams);
            
            examModel.find(req.body)        
            .then((examdata)=>{
                res.send({
                    status:200,
                    success:true,
                    messsage:"Data loaded!!",
                    data:examdata
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
module.exports ={getexamByterm,getall}