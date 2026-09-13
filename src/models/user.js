const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 2, maxlength: 50 },
    lastName: { type: String, required: true },
    emailId: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    age: { type: Number, required: true, min: 18, max: 100 },
    gender: { type: String, required: true },
    about: { type: String, maxlength: 500 },
    skills: { type: [String], default: [] },
    photoUrl: { type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL92q4svRDeN_ckSLp1kcxWTrFji0allD6NvCT9eEVbw&s=10" },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;