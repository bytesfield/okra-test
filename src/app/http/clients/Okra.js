const httpProcessor = require('../services/HttpProcessor');
const services = require('../../../config/services');

class Okra {

    constructor() {
        this.client = services.okra.client;
        this.apiKey = services.okra.api_key;
        this.baseUrl = services.okra.api_url;
        this.urlPrefix = '/v2/mock-api';

    }

    /**
    * Process axios calls
    * 
    * @param {string} method The call method get|post|put|delete|patch
    * @param {string} url The url to call
    * @param {object|formData} payload The payload data to send with the call
    */
    async httpClient(method, url, payload) {
        //HttpProcessor class to handle axios calls
        let processor = new httpProcessor(this.baseUrl, this.apiKey, this.client);

        return await processor.process(method, url, payload)
    }

    /**
     * Fetch user wallet
     * 
     * @param {object} payload 
     * @returns {object} response
     */
    async fetchWallet(payload) {
        let url = this.urlPrefix + '/fetch-wallet';

        try {
            const response = await this.httpClient('POST', url, payload);

            return response;

        } catch (error) {
            console.log(error);
            return error;
        }

    }

    /**
     * Pay amount to an account
     * 
     * @param {object} payload 
     * @returns {object} response
     */
    async pay(payload) {
        let url = this.urlPrefix + '/pay';

        try {
            const response = await this.httpClient('POST', url, payload);

            return response;

        } catch (error) {
            console.log(error);
            return error;
        }

    }

}

module.exports = Okra;