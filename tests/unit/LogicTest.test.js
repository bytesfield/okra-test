const Okra = require('../../src/app/http/clients/Okra');
const { ApiException } = require('../../src/app/http/exceptions');

let okra = new Okra();

describe("Logic Test", () => {

    it("Should not login if payload is empty", async () => {
        expect.assertions(2);

        try {
            const payload = {}

            await okra.login(payload);
        } catch (error) {
            expect(error).toBeInstanceOf(ApiException);
            expect(error).toHaveProperty('message', 'You must enter both username and password to continue!');
        }
    }, 80000);

    it("Should not login with wrong credentials", async () => {

        const payload = {
            username: "okra_user_wrong",
            password: "okra_pass_wrong"
        }

        expect.assertions(2);

        try {

            await okra.login(payload);
        } catch (error) {
            expect(error).toBeInstanceOf(ApiException);
            expect(error).toHaveProperty('message', 'Incorrect username and/or password, please try again!');
        }
    }, 80000);

    it("Should login with right credentials", async () => {

        const payload = {
            username: "okra_user",
            password: "okra_pass"
        }

        const response = await okra.login(payload);

        expect(response.message).toEqual('Login successful, profile returned.');
    }, 80000);

    it("Should refresh wallet", async () => {

        const payload = {
            username: "okra_user",
            password: "okra_pass"
        }

        const user = await okra.login(payload);
        const userProfile = user.data.profile;
        const profileId = userProfile.id;

        const response = await okra.refreshWallet({ id: profileId, variable: 'MyMockVariable' });

        expect(response.message).toEqual('Wallet successfully retrieved');
    }, 80000);

    it("Should Logout", async () => {

        const payload = {
            username: "okra_user",
            password: "okra_pass"
        }

        await okra.login(payload);

        const response = await okra.logout();

        expect(response.message).toEqual('okra-logout-bingo');
    }, 80000);


});