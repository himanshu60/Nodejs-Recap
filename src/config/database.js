const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://raghuvanshi:raghuvanshi@cluster0.pd5wkd1.mongodb.net/devTinder?retryWrites=true&w=majority';

const connectDB = async () => {
    await mongoose.connect(dbURI);
}

module.exports = { connectDB };