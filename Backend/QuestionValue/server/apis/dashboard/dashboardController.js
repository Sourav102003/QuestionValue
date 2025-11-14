const studentModel = require("../Student/studentModel");
const paperModel = require("../paper/paperModel");
const enquiryModel = require("../enquiry/enquiryModel");

const dashboard = async (req, res) => {
  try {
    // Get counts directly using await for readability
    const totalstudent = await studentModel.countDocuments({ status: true });
    const totalenquiry = await enquiryModel.countDocuments({ status: true });
    const totalpaper = await paperModel.countDocuments({ status: true });

    res.send({
      status: 200,
      success: true,
      message: "Dashboard loaded!!",
      totalstudent,
      totalenquiry,
      totalpaper
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      success: false,
      message: "Dashboard loading failed",
      error: err.message
    });
  }
};

module.exports = { dashboard };
