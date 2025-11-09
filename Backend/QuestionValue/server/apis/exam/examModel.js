const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
    name: { type: String, default: "" },
    
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
});

const exam = mongoose.models.exams || mongoose.model("exams", examSchema);

module.exports = exam;
