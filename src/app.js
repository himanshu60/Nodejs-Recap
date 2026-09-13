const express = require('express');
const app = express();
const port = 3000;
const {adminAuth,userAuth } = require('./middlewares/auth');

app.use("/admin", adminAuth);


app.get("/admin/getAllData", (req, res) => {
  res.send("All data retrieved");
});

app.get("/user/getUserData",userAuth, (req, res) => {
  res.send("User data retrieved");
});

app.get("/login", (req, res) => {
    try{
        throw new Error("Simulated error in login route"); // Simulate an error for testing 
        res.send("Login page");
    }catch(err){
        // console.error(err.stack);
        res.status(500).send("Internal Server Error");
    }
});


app.use("/",(err,req,res,next)=>{
    // console.error(err.stack);
    res.status(500).send("Internal Server Error from global error handler");
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
