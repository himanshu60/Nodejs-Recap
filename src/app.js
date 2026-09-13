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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
