const express = require("express");
require("dotenv").config();

const adminRouter = require("./routes/admin.js");
const userRouter = require("./routes/user.js");

const app = express();

app.use(express.json());

app.use("/admin", adminRouter);

app.use("/user", userRouter);

// global error catchapp
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send("An internal server error occurred");
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
