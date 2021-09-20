const Helper = require("../helpers/Helper");
const urlPrefix = "/api/auth";


const helper = new Helper();

describe("Auth Test", () => {

    const payload = {
        username: "okra_user",
        password: "okra_pass"
    }

    it("Should process logic Successfully", async () => {

        const res = await helper.apiServer.post(`${urlPrefix}/login`).send(payload);

        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual("success");
        expect(res.body.message).toEqual("Logic processed successfully");

    }, 80000);

    it("Should not process logic with empty payload", async () => {

        const res = await helper.apiServer.post(`${urlPrefix}/login`).send({});

        expect(res.statusCode).toEqual(422);
        expect(res.body.status).toEqual("failed");
        expect(res.body.message).toEqual("\"username\" is required");

    }, 80000);

    it("Should not process logic with wrong payload", async () => {
        payload.username = "okra_user_wrong";
        payload.password = "okra_pass_wrong";

        const res = await helper.apiServer.post(`${urlPrefix}/login`).send(payload);

        expect(res.statusCode).toEqual(400);
        expect(res.body.status).toEqual("failed");
        expect(res.body.message).toEqual("Incorrect username and/or password, please try again!");

    }, 800000);

});