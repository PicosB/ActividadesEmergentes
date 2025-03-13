const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.get('/payment/:id', paymentController.showPaymentForm);
router.post('/', paymentController.createPayment);
router.patch('/:id/proccess', paymentController.processPayment);

module.exports = router;
