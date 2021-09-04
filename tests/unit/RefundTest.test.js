const Okra = require('../../src/app/http/clients/Okra');

let okra = new Okra();

describe("Refund Test", () => {

    it("Should fetch Wallet", async () => {

        const payload = { id: 573839293 }

        const response = await okra.fetchWallet(payload);

        expect(response.message).toEqual('Wallet successfully retrieved');
    }, 80000);

    it("Should not fetch Wallet with invalid Id", async () => {

        const payload = { id: 573839293000 }

        const response = await okra.fetchWallet(payload);

        expect(response.message).toEqual('Wallet not found, please check the user or company ID and try again.');
    }, 80000);

    it("Should not fetch Wallet with empty payload", async () => {

        const payload = {}

        const response = await okra.fetchWallet(payload);

        expect(response.message).toEqual('Please enter a valid ID to continue.');
    }, 80000);

    it("Should pay with right payload", async () => {

        const rightPayload = {
            from_id: "484929849",
            to_id: "573839293",
            amount: 200
        }

        const response = await okra.pay(rightPayload);

        expect(response.message).toEqual('Payment successfully intiated');
    }, 80000);

    it("Should not pay with wrong wallets", async () => {

        const rightPayload = {
            from_id: "0000000",
            to_id: "00000000",
            amount: 200
        }

        const response = await okra.pay(rightPayload);

        expect(response.message).toEqual('Wallet(s) not found, please check the user or company ID and try again.');
    }, 80000);

    it("Should not pay with empty payload", async () => {

        const rightPayload = {}

        const response = await okra.pay(rightPayload);

        expect(response.message).toEqual('Please enter valid wallet IDs to continue.');
    }, 80000);



});