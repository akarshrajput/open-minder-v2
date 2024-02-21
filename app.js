const express = require("express");

const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
