const Okra = require('../clients/Okra');
const Helpers = require('../../modules/Helpers');

class Refund {

    constructor() {
        this.okra = new Okra();
        this.helper = new Helpers();
    }

    async process(companyId, customerId, amount) {

        let output = [
            {
                status: 'success',
                amount: amount
            }
        ];

        const companyWallet = await this.okra.fetchWallet({ id: companyId });

        if (this.helper.isEmptyObject(companyWallet.data)) {
            console.log(companyWallet.message);
            return companyWallet.message;
        }

        const customerWallet = await this.okra.fetchWallet({ id: customerId });

        if (this.helper.isEmptyObject(customerWallet.data)) {
            console.log(customerWallet.message);
            return customerWallet.message;
        }

        const companyWalletAmount = companyWallet.data.wallet.amount;

        const customerBeforeBalance = {
            initialBalance: {
                amount: customerWallet.data.wallet.amount,
                currency: customerWallet.data.wallet.currency
            }
        };

        output.push(customerBeforeBalance);

        if (companyWalletAmount && companyWalletAmount < amount) {
            const message = 'Company balance is insufficient to make refund';
            console.log(message);
            return message;
        }

        const processRefund = await this.okra.pay({ from_id: companyId, to_id: customerId, amount: amount });

        const customerAfterBalance = {
            currentBalance: {
                amount: processRefund.data.wallets.to.amount,
                currency: processRefund.data.wallets.to.currency
            }
        };

        output.push(customerAfterBalance);

        return output;

    }

}

module.exports = Refund;