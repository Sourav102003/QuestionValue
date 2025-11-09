const axios = require("axios");
const path = require("path");
const paperModel = require("./paperModel")
const {uploadImg} = require("../../utilities/helper")
const yearModel = require("../years/yearModel");
const subjectModel = require("../subject/subjectModel");
const departmentModel = require("../department/departmentModel");
const termModel = require("../term/termModel");
const examModel = require("../exam/examModel"); 
const semesterModel = require("../semester/semesterModel"); 

 const add = (req, res) => {
    var errMsgs = [];

    if (!req.body.name) {
        errMsgs.push("name is required!!");
    }
    if (!req.file) {
        errMsgs.push("file is required!!");
    }
    if (!req.body.year) {
        errMsgs.push("year is required!!");
    }
    if (!req.body.subject) {
        errMsgs.push("subject is required!!");
    }
    if (!req.body.department) {
        errMsgs.push("department is required!!");
    }
    if (!req.body.term) {
        errMsgs.push("term is required!!");
    }
    if (!req.body.exam) {
        errMsgs.push("exam is required!!");
    }
    if (!req.body.semester) {
        errMsgs.push("semester is required!!");
    }
    if (!req.body.user) {
        errMsgs.push("user is required!!");
    }
    if (errMsgs.length > 0) {
        return res.send({
            status: 422,
            success: false,
            message: errMsgs
        });
    }

    paperModel.findOne({ name: req.body.name })
        .then(async (paperdata) => {
            if (paperdata == null) {
                let paperObj = new paperModel();
                paperObj.name = req.body.name;
                paperObj.year = req.body.year;
                paperObj.subject = req.body.subject;
                paperObj.department = req.body.department;
                paperObj.term = req.body.term;
                paperObj.exam = req.body.exam;
                paperObj.semester = req.body.semester;
                paperObj.user = req.body.user;

                if (req.file) {
                    try {
                        let url = await uploadImg(req.file?.buffer);
                        paperObj.image = url;
                    } catch (err) {
                        console.log(err);
                        return res.send({
                            status: 400,
                            success: false,
                            message: "Cloudinary error!!"
                        });
                    }
                }

                paperObj.save()
                    .then(async (savedPaper) => {
                        const existingYear = await yearModel.findOne({ year: req.body.year });
                        if (!existingYear) {
                            let yearObj = new yearModel();
                            yearObj.year = req.body.year;
                            await yearObj.save();
                        }

                        const existingSubject = await subjectModel.findOne({ name: req.body.subject });
                        if (!existingSubject) {
                            let subjectObj = new subjectModel();
                            subjectObj.name = req.body.subject;
                            await subjectObj.save();
                        }

                        const existingDepartment = await departmentModel.findOne({ name: req.body.department });
                        if (!existingDepartment) {
                            let departmentObj = new departmentModel();
                            departmentObj.name = req.body.department;
                            await departmentObj.save();
                        }

                        const existingTerm = await termModel.findOne({ name: req.body.term });
                        if (!existingTerm) {
                            let termObj = new termModel();
                            termObj.name = req.body.term;
                            await termObj.save();
                        }

                        const existingsemester = await semesterModel.findOne({ name: req.body.semester });
                        if (!existingsemester) {
                            let semesterObj = new semesterModel();
                            semesterObj.name = req.body.semester;
                            await semesterObj.save();
                        }

                        const existingExam = await examModel.findOne({ name: req.body.exam });
                        if (!existingExam) {
                            let examObj = new examModel();
                            examObj.name = req.body.exam;
                            await examObj.save();
                        }

                        res.send({
                            status: 200,
                            success: true,
                            message: "Paper, year, subject, department, term, and exam data inserted!!",
                            data: savedPaper
                        });
                    })
                    .catch(() => {
                        res.send({
                            status: 500,
                            success: false,
                            message: "Something went wrong saving paper!!"
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
        .catch(() => {
            res.send({
                status: 500,
                success: false,
                message: "Something went wrong!!"
            });
        });
};

const getall = async(req,res)=>{
            var totalpapers = await paperModel.countDocuments()
            console.log("total papers",totalpapers);
            
            paperModel.find(req.body)       
            .then((paperdata)=>{
                res.send({
                    status:200,
                    success:true,
                    messsage:"Data loaded!!",
                    data:paperdata
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
const getSubjectsByDepartment = (req, res) => {
    const input =req.body.subject;
    paperModel.distinct(input, { department: 'CSE' }) 
        .then((subjects) => {
            res.send({
                status: 200,
                success: true,
                message: "Distinct subjects for department CSE fetched successfully",
                data: subjects
            });
        })
        .catch((err) => {
            console.log(err);
            res.send({
                status: 500,
                success: false,
                message: "Failed to fetch subjects"
            });
        });
};



const download = async (req, res) => {
  try {
    const fileUrl = req.body.url;

    if (!fileUrl) {
      return res.send({
        status: 422,
        success: false,
        message: "File URL is required!"
      });
    }

    // Get filename from url, drop query params
    const fileName = path.basename(fileUrl.split("?")[0]);
    const response = await axios({
      url: fileUrl,
      method: "GET",
      responseType: "arraybuffer"
    });

    // Set headers
    res.setHeader("Content-Type", response.headers["content-type"]);
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.end(response.data, "binary"); // Send buffer as binary data

  } catch (err) {
    console.error("Download error:", err.message);
    res.send({
      status: 500,
      success: false,
      message: "Failed to download file!"
    });
  }
};


module.exports ={add,getall,getSubjectsByDepartment,download}