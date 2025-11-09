const paperModel = require("../paper/paperModel")
const subjectModel = require("../subject/subjectModel")



const getall = async(req,res)=>{
            var totalsubjects = await subjectModel.countDocuments()
            console.log("total subjects",totalsubjects);
            
            subjectModel.find(req.body)        
            .then((subjectdata)=>{
                res.send({
                    status:200,
                    success:true,
                    messsage:"Data loaded!!",
                    data:subjectdata
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
const getsubjectByexam = (req, res) => {
    const examInput = req.body.exam; 
    paperModel.distinct('subject', { exam:examInput })
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
module.exports ={getall,getsubjectByexam}