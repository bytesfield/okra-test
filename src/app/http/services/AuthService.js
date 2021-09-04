const Okra = require('../clients/Okra');
const Helpers = require('../../modules/Helpers');

class AuthService {
    constructor() {
        this.okra = new Okra();
        this.helper = new Helpers();
    }

    async process(username, password) {

        let response = {
            'status': "success",
            'message': "Logic Processed Successfully",
            'data': {}
        };

        const user = await this.okra.login({ username: username, password: password });

        if (user.status && user.status === 'error') {
            return user;
        }

        const userProfile = user.data.profile;
        const profileId = userProfile.id;
        const userWallet = userProfile.wallet;

        let initialWalletBalance;

        if (userWallet !== null && !this.helper.isEmptyObject(userWallet)) {
            initialWalletBalance = userWallet.amount;
        }

        // Refresh user wallet
        const mockVariable = 'MyOkraMock';
        let newWallet = await this.okra.refreshWallet({ id: profileId, variable: mockVariable });

        if (newWallet.status && newWallet.status === 'error') {
            return newWallet;
        }

        //Logs User out
        let logoutUser = await this.okra.logout();

        if (logoutUser.status && logoutUser.status != 'success') {
            return logoutUser;
        }

        let responseData = {
            'name': userProfile.name,
            'id': profileId,
            'wallet_balance_before': initialWalletBalance.toString(),
            'wallet_balance_after': newWallet.data.wallet.amount.toString(),
            'logout_message': logoutUser.message
        }

        response['data'] = responseData;

        return response;

    }

}
module.exports = AuthService;