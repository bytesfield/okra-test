const express = require('express');
const RefundController = require('../app/http/controllers/transactions/RefundController');
const { asyncHandler } = require('../utils/helpers');

const router = express.Router();

router.post('/refund', asyncHandler(RefundController.refundCustomer));


module.exports = router;