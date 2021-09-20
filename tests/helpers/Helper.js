const supertest = require("supertest");
const app = require("../../src/index");

class Helper {
    constructor(model) {
        this.apiServer = supertest(app);
    }

}

module.exports = Helper;