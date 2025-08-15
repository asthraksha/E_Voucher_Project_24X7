// routes/memberRoutes.js
const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

router.post('/member/balance', memberController.getMemberBalance);
router.post('/member/vouchers', memberController.getVoucherHistory);

module.exports = router;