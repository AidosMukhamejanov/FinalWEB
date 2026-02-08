const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/resource", require("./routes/resourceRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));

app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
