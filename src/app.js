require('dotenv').config({quiet: true});
const express = require('express');
const { connectDB } = require("./config/database")
const app = express();
app.use(express.json());
const User = require("./models/user");
const port = process.env.PORT || 3000;

app.post("/signup", async (req, res) => {
    const data =req.body
    // console.log("Received signup data:", data);
    const user = new User(data);
    try {
        await user.save();
        res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
        res.status(500).json({ message: "Error occurred while signing up" });
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
