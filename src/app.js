const express = require('express');
const app = express();
const port = 3000;

app.use("/home",(req,res)=>{
    res.send('Hello World from Express.js new!');
})

app.use("/about",(req,res)=>{
    res.send('About Page');
})

app.get("/contact",(req,res)=>{
    res.send({firstName: "Himanshu", lastName: "Choudhary"});
})

app.post("/contact",(req,res)=>{
    res.status(201).send({firstName: "Himanshu", lastName: "Choudhary"});
})

// app.use("/",(req,res)=>{
//     res.send('Hello World from Express.js!');
// })

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
