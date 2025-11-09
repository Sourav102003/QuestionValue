const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema({
    name: { type: String, default: "" }, 
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
});

const semester = mongoose.models.semesters || mongoose.model("semesters", semesterSchema);

module.exports = semester;
