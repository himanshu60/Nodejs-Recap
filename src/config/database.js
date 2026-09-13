const mongoose = require('mongoose');
const dbURI = process.env.dbURI ;
// console.log("Database URI:", dbURI); // Log the database URI to verify it's being read correctly    

const connectDB = async () => {
    await mongoose.connect(dbURI);
}

module.exports = { connectDB };