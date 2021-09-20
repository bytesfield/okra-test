const Okra = require('../clients/Okra');
const { isEmptyObject } = require('../../../utils/helpers');
const { success, badRequest } = require('../../http/responses');

class AuthService {
    constructor() {
        this.okra = new Okra();
    }

    /** Process Login and wallet refresh
     * 
     * @param {Response} res 
     * @param {string} username 
     * @param {string} password 
     * 
     * @returns {Promise<any>}
     */
    async process(res, username, password) {

        let response = {};

        const user = await this.okra.login({ username: username, password: password });

        if (user.status && user.status === 'error') {
            return badRequest(res, user.message);
        }

        const userProfile = user.data.profile;
        const profileId = userProfile.id;
        const userWallet = userProfile.wallet;

        let initialWalletBalance;

        if (userWallet !== null && !isEmptyObject(userWallet)) {
            initialWalletBalance = userWallet.amount;
        }

        // Refresh user wallet
        const mockVariable = 'MyOkraMock';
        let newWallet = await this.okra.refreshWallet({ id: profileId, variable: mockVariable });

        if (newWallet.status && newWallet.status === 'error') {
            return badRequest(res, newWallet.message);
        }

        //Logs User out
        let logoutUser = await this.okra.logout();

        if (logoutUser.status && logoutUser.status != 'success') {
            return badRequest(res, logoutUser.message);
        }

        let responseData = {
            'id': profileId,
            'name': userProfile.name,
            'wallet_balance_before': initialWalletBalance.toString(),
            'wallet_balance_after': newWallet.data.wallet.amount.toString(),
            'logout_message': logoutUser.message
        }

        response = responseData;

        return success(res, 'Logic processed successfully', response);

    }

}
module.exports = AuthService;