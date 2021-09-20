const express = require('express');
const cors = require("cors");
const compression = require("compression");
const ExceptionHandler = require('./app/http/middlewares/ExceptionHandler');
const { HttpException } = require('./app/http/exceptions');
const routes = require('./routes');

const app = express();

app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.use(compression());
app.use(cors());

app.use(routes);

app.all("*", (req, res, next) => {
    next(new HttpException(`Requested path ${req.path} not found.`, 404));
});

app.use(ExceptionHandler);

module.exports = app;