const axios = require("axios");
const path = require("path");
const libraryModel = require("./libraryModel");
const { uploadImg } = require("../../utilities/helper");

const add = (req, res) => {
  var errMsgs = [];

  if (!req.body.name) {
    errMsgs.push("name is required!!");
  }
  if (!req.body.department) {
    errMsgs.push("department is required!!");
  }
  if (!req.file) {
    errMsgs.push("file is required!!");
  }
  if (errMsgs.length > 0) {
    return res.send({
      status: 422,
      success: false,
      message: errMsgs,
    });
  }

  libraryModel
    .findOne({ name: req.body.name })
    .then(async (librarydata) => {
      if (librarydata == null) {
        let libraryObj = new libraryModel();
        libraryObj.name = req.body.name;
        libraryObj.department = req.body.department;

        // CORRECTED ASSIGNMENT
        if (req.file && req.file.mimetype.startsWith("image/")) {
          try {
            let url = await uploadImg(req.file.buffer);
            libraryObj.image = url;
          } catch (err) {
            return res.send({
              status: 400,
              success: false,
              message: "Cloudinary error!!",
            });
          }
        }

        libraryObj
          .save()
          .then((librarydata) => {
            res.send({
              status: 200,
              success: true,
              message: "library data inserted!!",
              data: librarydata,
            });
          })
          .catch((err) => {
            res.send({
              status: 500,
              success: false,
              message: "Something went wrong!!",
            });
          });
      } else {
        res.send({
          status: 422,
          success: false,
          message: "Data already exists!!",
        });
      }
    })
    .catch((err) => {
      res.send({
        status: 500,
        success: false,
        message: "Something went wrong!!",
      });
    });
};

const getall = async (req, res) => {
  var totallibrarys = await libraryModel.countDocuments();
  console.log("total librarys", totallibrarys);

  libraryModel
    .find(req.body)
    .then((librarydata) => {
      res.send({
        status: 200,
        success: true,
        messsage: "Data loaded!!",
        data: librarydata,
      });
    })
    .catch((err) => {
      res.send({
        status: 500,
        success: false,
        messsage: "Something went wrong!!",
      });
    });
};
const getallDepartment = async (req, res) => {
  try {
    const departmentdata = await libraryModel.find(req.body).select("department");
    res.send({
      status: 200,
      success: true,
      message: "Data loaded!!",
      data: departmentdata
    });
  } catch (err) {
    console.error("getallDepartment error:", err); 
    res.send({
      status: 500,
      success: false,
      message: "Something went wrong!!"
    });
  }
};
const getLibraryByDepartment = async (req, res) => {
  try {
    const { department } = req.body;
    if (!department) {
      return res.send({
        status: 400,
        success: false,
        message: "Department is required!"
      });
    }

    const data = await libraryModel.find({ department });
    res.send({
      status: 200,
      success: true,
      message: "Data loaded!!",
      data
    });
  } catch (err) {
    console.error("getLibraryByDepartment error:", err);
    res.send({
      status: 500,
      success: false,
      message: "Something went wrong!!"
    });
  }
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
module.exports = { add, getall,getallDepartment ,getLibraryByDepartment,download};
