const Helper = require("../helpers/Helper");
const urlPrefix = "/api/auth";


const helper = new Helper();

describe("Auth Test", () => {

    const rightPayload = {
        username: "okra_user",
        password: "okra_pass"
    }
    const wrongPayload = {
        username: "okra_user_wrong",
        password: "okra_pass_wrong"
    }

    it("Should process logic Successfully", async () => {

        const { res } = await helper.apiServer
            .post(`${urlPrefix}/login`)
            .send(rightPayload);

        expect(res.statusCode).toEqual(200);
        expect(res.statusMessage).toBe("OK");

    }, 80000);

    it("Should not process logic with empty payload", async () => {

        const { res } = await helper.apiServer
            .post(`${urlPrefix}/login`)
            .send({});

        expect(res.statusCode).toEqual(422);
        expect(res.statusMessage).toBe("Unprocessable Entity");

    }, 80000);

    it("Should not process logic with wrong payload", async () => {

        const { res } = await helper.apiServer
            .post(`${urlPrefix}/login`)
            .send(wrongPayload);

        expect(res.statusCode).toEqual(400);
        expect(res.statusMessage).toBe("Bad Request");

    }, 800000);

});