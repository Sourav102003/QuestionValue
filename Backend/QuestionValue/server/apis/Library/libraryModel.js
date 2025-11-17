const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
    name: { type: String, default: "" },
    department: { type: String, default: "" },
    image: { type: String, default: "" },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
});

const library = mongoose.models.librarys || mongoose.model("librarys", librarySchema);

module.exports = library;
