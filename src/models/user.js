const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 2, maxlength: 50 },
    lastName: { type: String },
    emailId: { type: String, required: true, unique: true, lowercase: true, trim: true, validate: [validator.isEmail, 'Invalid email address'] },
    password: { type: String, required: true, minlength: 8, validate: [validator.isStrongPassword, 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol'] },
    age: { type: Number, min: 18, max: 100 },
    gender: { type: String, required: true },
    about: { type: String, maxlength: 500 },
    skills: { type: [String], default: [] },
    photoUrl: { type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL92q4svRDeN_ckSLp1kcxWTrFji0allD6NvCT9eEVbw&s=10", validate: [validator.isURL, 'Invalid URL'] },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;