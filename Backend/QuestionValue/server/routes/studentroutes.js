const routes = require("express").Router()
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const userController = require("../apis/user/userController")
const studentController = require("../apis/Student/studentController")
const enquiryController = require("../apis/enquiry/enquiryController")
const departmentController = require("../apis/department/departmentController")
const paperController = require("../apis/paper/paperController")
const yearController = require("../apis/years/yearController")
const termController = require("../apis/term/termController")
const examController = require("../apis/exam/examController")
const subjectController = require("../apis/subject/subjectController")
const semesterController = require("../apis/semester/semesterController")
const dashboardController = require("../apis/dashboard/dashboardController")
const generateResponse =require("../apis/chatboat/generateResponse")

routes.post("/ask",generateResponse.askGemini)
routes.post("/dashboard",dashboardController.dashboard)
routes.post("/user/login",userController.Login)
routes.post("/student/register",studentController.register)
routes.post("/student/getall",studentController.getall)

routes.post("/enquiry/add",enquiryController.add)
routes.post("/enquiry/getSingle",enquiryController.getSingle)
routes.post("/enquiry/update",enquiryController.update)
routes.post("/enquiry/deleteOne",enquiryController.deleteOne)
routes.post("/enquiry/changeStatus",enquiryController.changeStatus)
routes.post("/enquiry/getall",enquiryController.getall)

routes.post("/department/add",departmentController.add)
routes.post("/department/getall",departmentController.getall)

routes.post("/paper/add",upload.single("image"),paperController.add)
routes.post("/paper/getall",paperController.getall)
routes.post("/paper/getSubjectsByDepartment",paperController.getSubjectsByDepartment)
routes.post("/paper/download",paperController.download)


routes.post("/year/getall",yearController.getall)
routes.post("/year/getYearsByDepartment",yearController.getYearsByDepartment)

routes.post("/term/gettermByYears",termController.gettermByYears)
routes.post("/term/getall",termController.getall)

routes.post("/exam/getexamByterm",examController.getexamByterm)
routes.post("/exam/getall",examController.getall)

routes.post("/subject/getsubjectByexam",subjectController.getsubjectByexam)
routes.post("/subject/getall",subjectController.getall)

routes.post("/semester/getall",semesterController.getall)

module.exports = routes 