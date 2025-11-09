const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema({
    name: { type: String, default: "" }, 
    image: { type: String, default: "" }, 

    year: { type: String, default: "" },
    subject: { type: String, default: "" },
    department: { type: String, default: ""},
    term: { type: String, default: "" },
    exam: { type: String, default: "" },
    semester:{type: String, default: ""},
    user: { type: String, default: "" },

    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
});

const Paper = mongoose.models.papers || mongoose.model("papers", paperSchema);

module.exports = Paper;
