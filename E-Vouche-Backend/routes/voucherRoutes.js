// routes/voucherRoutes.js
const express = require('express');
const router = express.Router();
const voucherController = require('../controllers/voucherController');

router.post('/voucher/create', voucherController.createVoucher);
router.post('/voucher/assign', voucherController.assignVoucher);
router.get('/voucher/:voucherCode', voucherController.getVoucherDetails);

module.exports = router;