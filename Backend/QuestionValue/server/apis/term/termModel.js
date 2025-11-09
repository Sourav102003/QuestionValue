const mongoose = require("mongoose");

const termSchema = new mongoose.Schema({
    name: { type: String, default: "" },
    // code: { type: String, default: "" },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
});

const term = mongoose.models.terms || mongoose.model("terms", termSchema);

module.exports = term;
