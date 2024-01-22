const {getOrderId, paymentCallBack, paymentCancel} = require('../controllers/paymentController');
const express = require('express');
const router = express();

router.post('/orders', getOrderId);
router.post('/payment-callback', paymentCallBack);
router.get('/payment-cancel', paymentCancel);

module.exports = router;