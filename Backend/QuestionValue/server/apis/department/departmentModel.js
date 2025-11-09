const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    name: { type: String, default: "" },
    // code: { type: String, default: "" },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
});

const Department = mongoose.models.departments || mongoose.model("departments", departmentSchema);

module.exports = Department;
