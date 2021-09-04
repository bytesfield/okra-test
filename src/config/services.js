require('dotenv').config()

const services = {};

services.okra = {
    'client': process.env.OKRA_CLIENT,
    'api_url': process.env.OKRA_BASE_URL,
    'api_key': process.env.OKRA_API_KEY
}

module.exports = services;