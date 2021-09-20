const Helper = require("../helpers/Helper");
const urlPrefix = "/api/transaction";


const helper = new Helper();

describe("Refund Test", () => {

    const payload = {
        company_id: "484929849",
        customer_id: "573839293",
        amount: 200
    }

    it("Should refund amount Successfully", async () => {

        const res = await helper.apiServer.post(`${urlPrefix}/refund`).send(payload);

        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual("success");
        expect(res.body.message).toEqual("Refund processed successfully");

    }, 80000);

    it("Should not refund with empty payload", async () => {

        const res = await helper.apiServer.post(`${urlPrefix}/refund`).send({});

        expect(res.statusCode).toEqual(422);
        expect(res.body.status).toEqual("failed");
        expect(res.body.message).toEqual("\"company_id\" is required");

    }, 80000);

    it("Should not refund if company balance is less than amount", async () => {

        payload['amount'] = 20000000000;

        const res = await helper.apiServer.post(`${urlPrefix}/refund`).send(payload);

        expect(res.statusCode).toEqual(400);
        expect(res.body.status).toEqual("failed");
        expect(res.body.message).toEqual("Company balance is insufficient to make refund");

    }, 80000);

    it("Should not refund with wrong payload", async () => {
        payload.company_id = "48492";
        payload.customer_id = "57383";

        const res = await helper.apiServer.post(`${urlPrefix}/refund`).send(payload);

        expect(res.statusCode).toEqual(400);
        expect(res.body.status).toEqual("failed");
        expect(res.body.message).toEqual("Wallet not found, please check the user or company ID and try again.");

    }, 80000);

});