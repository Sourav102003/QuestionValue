const departmentModel = require("./departmentModel")


const add = (req, res) => {
    var errMsgs = [];

    if (!req.body.name) {
        errMsgs.push("name is required!!");
    }
    if (!req.body.code) {
        errMsgs.push("code is required!!");
    }
    if (errMsgs.length > 0) {
        return res.send({
            status: 422,
            success: false,
            message: errMsgs
        });
    }

    departmentModel.findOne({ name: req.body.name })
        .then(async(departmentdata) => {
            console.log("department data is", departmentdata);
            if (departmentdata == null) {
                let departmentObj = new departmentModel();
                departmentObj.name = req.body.name;
                departmentObj.code = req.body.code;
                departmentObj.save()
                    .then((departmentdata) => {
                        res.send({
                            status: 200,
                            success: true,
                            message: "department data inserted!!",
                            data: departmentdata
                        });
                    })
                    .catch((err) => {
                        res.send({
                            status: 500,
                            success: false,
                            message: "Something went wrong!!"
                        });
                    });
            } else {
                res.send({
                    status: 422,
                    success: false,
                    message: "Data already exists!!"
                });
            }
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
            var totaldepartments = await departmentModel.countDocuments()
            console.log("total departments",totaldepartments);
            
            departmentModel.find(req.body)        
            .then((departmentdata)=>{
                res.send({
                    status:200,
                    success:true,
                    messsage:"Data loaded!!",
                    data:departmentdata
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


module.exports ={add,getall,}