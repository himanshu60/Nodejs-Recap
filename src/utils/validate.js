const validator = require('validator');
const validateSignupData = (req) => {
    console.log("Validating signup data:", req.body);
    const { firstName, emailId, password } = req.body;
    if (!firstName || !emailId || !password) {
        throw new Error("Missing required fields: firstName, emailId, and password are required");
    } else if (firstName.length < 2 || firstName.length > 50) {
        throw new Error("First name must be between 2 and 50 characters long");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Invalid email address");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol");
    }
}

module.exports = { validateSignupData };