const Okra = require('../clients/Okra');
const { isEmptyObject } = require('../../../utils/helpers');
const { success, badRequest } = require('../../http/responses');

class Refund {

    constructor() {
        this.okra = new Okra();
    }

    /** Process Refund
     * 
     * @param {Response} res 
     * @param {integer} companyId 
     * @param {integer} customerId 
     * @param {integer} amount 
     * 
     * @returns {Promise<any>}
     */
    async process(res, companyId, customerId, amount) {

        let output = {
            amount: amount
        };

        const companyWallet = await this.okra.fetchWallet({ id: companyId });

        if (isEmptyObject(companyWallet.data)) {
            return badRequest(res, companyWallet.message);
        }

        const customerWallet = await this.okra.fetchWallet({ id: customerId });

        if (isEmptyObject(customerWallet.data)) {
            return badRequest(res, customerWallet.message);
        }

        const companyWalletAmount = companyWallet.data.wallet.amount;

        const customerBeforeBalance = {
            amount: customerWallet.data.wallet.amount,
            currency: customerWallet.data.wallet.currency
        };

        output['initialBalance'] = customerBeforeBalance;

        if (companyWalletAmount && companyWalletAmount < amount) {
            return badRequest(res, 'Company balance is insufficient to make refund');
        }

        const processRefund = await this.okra.pay({ from_id: companyId, to_id: customerId, amount: amount });

        const customerAfterBalance = {
            amount: processRefund.data.wallets.to.amount,
            currency: processRefund.data.wallets.to.currency
        };

        output['currentBalance'] = customerAfterBalance;

        return success(res, 'Refund processed successfully', output);

    }

}

module.exports = Refund;