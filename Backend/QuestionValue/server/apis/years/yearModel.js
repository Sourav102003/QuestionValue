const mongoose = require("mongoose");

const yearSchema = new mongoose.Schema({
    year: { type: Number, default: 0 },
    // semester: { type: Number, default: 0 }, 
    // examType: { type: String, default: "" }, 
    // subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "subjects" },
    // papers: [{ type: mongoose.Schema.Types.ObjectId, ref: "papers" }],

    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
});

const Year = mongoose.models.years || mongoose.model("years", yearSchema);

module.exports = Year;
