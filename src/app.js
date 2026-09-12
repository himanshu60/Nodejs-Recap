const express = require('express');
const app = express();
const port = 3000;

app.use("/home",(req,res)=>{
    res.send('Hello World from Express.js new!');
})

app.use("/",(req,res)=>{
    res.send('Hello World from Express.js!');
})

app.use("/about",(req,res)=>{
    res.send('About Page');
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
