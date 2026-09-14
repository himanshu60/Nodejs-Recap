const jwt = require("jsonwebtoken");
const User = require("../models/user")

const userAuth = async (req, res, next) => {
    try {
        //    read the token from req cookie 
        const { token } = req.cookies;
        console.log(token)
        if (!token) {
            throw new Error("token not found!")
        }
        const decodedDataObj = await jwt.verify(token, "DEV@Tender$3008")
        const { _id } = decodedDataObj;
        const user = await User.findById(_id);
        if (!user) {
            res.status(404).send("user not found");
        } else {
            req.user = user;
            next()
        }
        // validate the token
        // find the user
    } catch (err) {
        res.status(401).send("ERROR: " + err.message);
    }
}

module.exports = { userAuth };