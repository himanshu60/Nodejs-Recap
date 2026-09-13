const express = require('express');
const app = express();
const port = 3000;


app.get("/admin/getAllData", (req, res) => {
  const token = "xyz123"; // Replace with your actual token
  const isAuthorized = token === "x1yz123"; // Replace with your actual authorization logic

  if (!isAuthorized) {
    return res.status(403).send("Unauthorized access");
  }
  res.send("All data retrieved");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
