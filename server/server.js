const express = require("express");
require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db_config");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const PORT = process.env.PORT || 5000;

// DB CONNECTION
connectDB();

app.get("/", (req, res) => {
  res.json({
    msg: "PROPETY-PULSE IS RUNNING...",
  });
});

// BODY-PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// AUTH ROUTES
app.use("/api/auth", require("./routes/authRoutes"));

// PROPERTY ROUTES
app.use("/api/property", require("./routes/propertyRoutes"));

// MESSAGES ROUTES
app.use("/api/message", require("./routes/messageRoutes"));

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING AT PORT : ${PORT}`.bgBlue.white);
});
