const express = require("express");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
