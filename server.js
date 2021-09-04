const app = require("./index");
const dotenv = require('dotenv');

dotenv.config();

port = process.env.APP_PORT;

app.listen(port, () => console.log(`Server listening on port ${port}`));