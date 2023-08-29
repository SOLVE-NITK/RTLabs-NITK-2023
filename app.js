const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/plot", (req, res) => {
  // Redirect to the plot page in a new tab
  res.send(
    `<script>window.open('/plotPage.html', '_blank')</script>`
  );
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
