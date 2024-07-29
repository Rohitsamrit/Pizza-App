const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const app = express();
const orderRoutes = require("./routes/orderRoutes"); // Adjust the path as needed

// Middleware to enable CORS
app.use(cors());

const connectDB = require("./config/config");
require("colors");
const morgan = require("morgan");

//config dotenv
// dotenv.config();
require("dotenv").config();

//connection mongodb
connectDB();

//middlewares
app.use(express.json());
app.use(morgan("dev"));

//route
app.use(
  "https://pizza-app-3-pwf5.onrender.com/api/v1/user",
  require("./routes/userRoutes")
);
app.use(
  "https://pizza-app-3-pwf5.onrender.com/api/v1/pizza/",
  require("./routes/pizzaRoutes")
);
app.use("https://pizza-app-3-pwf5.onrender.com/api/v1/order", orderRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "API RUNNING",
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `Server Running On ${process.env.NODE_ENV} mode on port no ${process.env.PORT}`
      .bgMagenta.white
  );
});
