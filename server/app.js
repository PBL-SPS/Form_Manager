var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const compression = require("compression");

var indexRouter = require("./routes/index");
const apiErrorHandler = require("./errors/apiErrorhandler");

var app = express();

app.use(logger("dev"));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.use(apiErrorHandler);

module.exports = app;
