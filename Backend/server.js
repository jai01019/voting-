const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./db");
const userRoutes = require("./routes/userRoutes");
const bodyparser = require("body-parser");
const candidateRoutes = require("./routes/candidateRoutes");
//const { jwtAuthMiddleware } = require("./jwt");
app.use(bodyparser.json());
const cors = require("cors"); // <== did you add this?

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use("/user", userRoutes);
app.use("/candidate", candidateRoutes);

app.use(bodyparser.json());

const PORT = process.env.PORT || 8000;

app.use("/user", userRoutes);
app.use("/candidate", candidateRoutes);

app.listen(PORT, (req, res) => {
  console.log(`port is listing at:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("this is on 8000 port");
});
