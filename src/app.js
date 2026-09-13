const express = require('express');
const app = express();
const port = 3000;

app.use("/user",(req,res,next)=>{
    // res.send("User route");
    console.log("User route middleware");
    next();
},(req,res)=>{
    console.log("User route handler");
    res.send("User route 2");
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
