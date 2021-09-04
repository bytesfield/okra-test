const Helper = require("../helpers/Helper");
const urlPrefix = "/api/transaction";


const helper = new Helper();

describe("Refund Test", () => {

    const rightPayload = {
        company_id: "484929849",
        customer_id: "573839293",
        amount: 200
    }
    const wrongPayload = {
        company_id: "48492",
        customer_id: "57383",
        amount: 200
    }

    it("Should refund amount Successfully", async () => {

        const { res } = await helper.apiServer
            .post(`${urlPrefix}/refund`)
            .send(rightPayload);
        expect(res.statusCode).toEqual(200);
        expect(res.statusMessage).toBe("OK");

    }, 80000);

    it("Should not refund with empty payload", async () => {

        const { res } = await helper.apiServer
            .post(`${urlPrefix}/refund`)
            .send({});
        expect(res.statusCode).toEqual(422);
        expect(res.statusMessage).toBe("Unprocessable Entity");

    }, 80000);

    it("Should not refund with wrong payload", async () => {

        const { res } = await helper.apiServer
            .post(`${urlPrefix}/refund`)
            .send(wrongPayload);
        expect(res.statusCode).toEqual(400);
        expect(res.statusMessage).toBe("Bad Request");

    }, 80000);

    it("Should not refund if company balance is less than amount", async () => {

        rightPayload['amount'] = 20000000000;

        const { res } = await helper.apiServer
            .post(`${urlPrefix}/refund`)
            .send(rightPayload);
        expect(res.statusCode).toEqual(400);
        expect(res.statusMessage).toBe("Bad Request");

    }, 80000);

});