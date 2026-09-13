require('dotenv').config({ quiet: true });
const express = require('express');
const { connectDB } = require("./config/database")
const app = express();
app.use(express.json());
const User = require("./models/user");
const port = process.env.PORT || 3000;

app.post("/signup", async (req, res) => {
    const data = req.body
    // console.log("Received signup data:", data);
    const user = new User(data);
    try {
        await user.save();
        res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
        res.status(500).json({ message: "Error occurred while signing up", error: err.message });
    }
})

app.get("/users", async (req, res) => {
    const users = req.body.emailId;
    try {
        if (!users || users.length === 0) {
            return res.status(400).json({ message: "No email IDs provided" });
        } else {
            const foundUsers = await User.find({ emailId: users });
            res.status(200).json({ message: "Users found successfully", foundUsers });
        }
    } catch (err) {
        res.status(500).json({ message: "Error occurred while fetching users" });
    }
});

app.get("/allUsers", async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.status(200).json({ message: "All users found successfully", users: allUsers });
    } catch (err) {
        res.status(500).json({ message: "Error occurred while fetching all users" });
    }
})

app.get("/oneUser", async (req, res) => {
    const email = req.body.emailId;
    try {
        if (!email) {
            return res.status(400).json({ message: "Email ID is required" });
        } else {
            const oneUser = await User.findOne({ emailId: email });
            res.status(200).json({ message: "All users found successfully", users: oneUser });
        }
    } catch (err) {
        res.status(500).json({ message: "Error occurred while fetching all users" });
    }
})

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch((err) => {
    console.error("Database connection error:", err);
})
