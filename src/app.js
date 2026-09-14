require('dotenv').config({ quiet: true });
const express = require('express');
const { connectDB } = require("./config/database")
const app = express();
app.use(express.json());
const User = require("./models/user");
const { validateSignupData } = require("./utils/validate");
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const jwt = require('jsonwebtoken');
const { userAuth } = require("./middlewares/auth")
const port = process.env.PORT || 3000;

app.post("/signup", async (req, res) => {
    try {
        // validate the request body against the User schema
        validateSignupData(req);

        const { firstName, lastName, emailId, password, age, gender, about } = req.body;

        // Encrypt the password before saving to the database
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: hashedPassword,
            age,
            gender,
            about,
        });
        await user.save();
        res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
        res.status(500).json({ message: "Error occurred while signing up", error: err.message });
    }
})

app.post("/login", async (req, res) => {
    const { emailId, password } = req.body;
    try {
        const user = await User.findOne({ emailId });
        const hashedPassword = user?.password;
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);
        const token = jwt.sign({ _id: user._id }, "DEV@Tender$3008", { expiresIn: "1d" });
        // console.log("token", token)
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        res.cookie('token', token);
        res.status(200).json({ message: "Login successful", user });
    } catch (err) {
        res.status(500).json({ message: "Error occurred while logging in", error: err.message });
    }
});

app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        // console.log(user)
        res.status(200).send({ message: "Profile route accessed successfully", userData: user })
    } catch (err) {
        res.status(500).json({ message: "Error occurred while accessing profile", error: err.message });
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

app.delete("/deleteUser", async (req, res) => {
    const userId = req.body.userId;
    try {
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        else {
            const deletedUser = await User.findByIdAndDelete(userId);
            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" });
            } else {
                res.status(200).json({ message: "User deleted successfully", user: deletedUser });
            }
        }
    } catch (err) {
        res.status(500).json({ message: "Error occurred while deleting user" });
    }
});

app.patch("/updateUser/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const updateData = req.body
    try {
        const AllowedUpdates = ["firstName", "lastName", "password", "age", "gender", "about", "skills", "photoUrl"];
        const isValidUpdate = Object.keys(updateData).every((key) => AllowedUpdates.includes(key));
        if (!isValidUpdate) {
            return res.status(400).send({ message: "Invalid update fields" });
        }
        if (!userId) {
            res.status(404).send({ message: "userId not found" })
        } else {
            const updateUser = await User.findByIdAndUpdate(userId, updateData, { returnDocument: "after" });
            if (!updateUser) {
                res.status(404).send({ message: "userId not found" })
            } else {
                res.status(200).send({ message: "user updated sucessfully", updateUser })
            }
        }
    } catch (err) {

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
