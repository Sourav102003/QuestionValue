const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    name: { type: String, default: "" }, // e.g., DBMS, Physics
    // code: { type: String, default: "" }, // e.g., CS101
    // departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "departments" },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
});

const Subject = mongoose.models.subjects || mongoose.model("subjects", subjectSchema);

module.exports = Subject;
