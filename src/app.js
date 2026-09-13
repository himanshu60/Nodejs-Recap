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

app.get("/user/:id",(req,res)=>{
    res.send({firstName: "Himanshu", lastName: "Choudhary"});
})

// 
// What you want	Express 4 (old tutorials)	Express 5
// One or more b	"/ab+c"	/^\/ab+c$/ (regex)
// Optional b	"/ab?c"	"/a{b}c"
// Optional group	"/a(bc)?d"	"/a{bc}d"
// Wildcard	"/ab*cd"	"/ab*splat" (wildcard must have a name)
// Match everything	"*"	"/*splat" or "/{*splat}"
// Route param	"/user/:id"	"/user/:id" (unchanged)
// Regex routes like /a/ (any path containing "a") or /.*fly$/ work the same in both versions.

app.get(/^\/ab+c$/,(req,res)=>{
    res.send({firstName: "Himanshu", lastName: "Choudhary"});
})



// app.use("/",(req,res)=>{
//     res.send('Hello World from Express.js!');
// })

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
