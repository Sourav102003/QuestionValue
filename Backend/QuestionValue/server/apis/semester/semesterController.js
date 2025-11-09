const paperModel = require("../paper/paperModel")
const semesterModel = require("../semester/semesterModel")



const getall = async(req,res)=>{
            var totalsemesters = await semesterModel.countDocuments()
            console.log("total semesters",totalsemesters);
            
            semesterModel.find(req.body)        
            .then((semesterdata)=>{
                res.send({
                    status:200,
                    success:true,
                    messsage:"Data loaded!!",
                    data:semesterdata
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
module.exports={getall}