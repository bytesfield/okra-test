const app = require("./index");

const config = require('./config');

const port = config.app.port;

app.listen(port, () => {
    console.log(`${config.app.name} server is running on ${config.app.env} at port ${port}`);
});