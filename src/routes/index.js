const express = require('express');
const { success } = require('../app/http/responses');
const transactionApiRoutes = require('./TransactionApiRoutes');
const authApiRoutes = require('./AuthApiRoutes');
const config = require('../config');

const router = express.Router();

router.use('/api/transaction', transactionApiRoutes);
router.use('/api/auth', authApiRoutes);

router.get('/', (request, response) => {
    return success(response, `${config.app.name} API v1.`);
});

module.exports = router;