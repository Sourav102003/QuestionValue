const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    password: { type: String, default: "" },
    phone: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    address: { type: String, default: "" },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
});

// 👇 THIS line prevents OverwriteModelError
const Student = mongoose.models.Students || mongoose.model("Students", StudentSchema);

module.exports = Student;
