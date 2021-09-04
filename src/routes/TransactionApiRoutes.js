const express = require('express');
const RefundController = require('../app/http/controllers/transactions/RefundController');

const router = express.Router();

router.post('/refund', RefundController.refundCustomer);


module.exports = router;