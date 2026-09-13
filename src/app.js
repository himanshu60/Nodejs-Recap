const express = require('express');
const app = express();
const port = 3000;

app.use("/admin", (req, res, next) => {
    console.log("Admin route accessed");
    const token = "xyz";
    const isAuthorized = token === "xyz"; // Replace with your actual authorization logic

    if (!isAuthorized) {
        return res.status(403).send("Unauthorized access");
    }
    next();
});


app.get("/admin/getAllData", (req, res) => {
  res.send("All data retrieved");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
