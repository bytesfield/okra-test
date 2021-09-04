const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const compression = require("compression");
const csurf = require("csurf");
const transactionApiRoutes = require('./src/routes/TransactionApiRoutes');
const authApiRoutes = require('./src/routes/AuthApiRoutes');
const exception = require('./src/app/http/middlewares/Exception');
const cookieSession = require("cookie-session");


dotenv.config();


secrets = process.env;
port = process.env.APP_PORT;

const app = express();

// #Middleware
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.use(compression());
app.use(cors());

app.use((req, res, next) => {
    res.locals.secrets = secrets;
    next();
});

// #Cookie Session
app.use(
    cookieSession({
        secret: secrets.COOKIE_SESSION_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        httpOnly: true,
        secure: false,
    })
);

// #CSRF security for Production
if (process.env.NODE_ENV == "production") {
    app.use(csurf());
    app.use((req, res, next) => {
        res.set("x-frame-options", "DENY");
        res.cookie("mytoken", req.csrfToken());
        next();
    });
}


//AApi Routes
app.use('/api/transaction', transactionApiRoutes);
app.use('/api/auth', authApiRoutes);

//Exception Handlers Middleware
app.use(exception.handleValidationError);
app.use(exception.handleTypeError);
app.use(exception.handleServerError);
app.use(exception.handleReferenceError);
app.use(exception.handleNotFoundError);

const server = app.listen(port, () => console.log(`Server listening on port ${port}`));

module.exports = server;