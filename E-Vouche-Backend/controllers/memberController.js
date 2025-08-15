// controllers/memberController.js
const memberService = require('../services/memberService');

exports.getMemberBalance = async (req, res) => {
    try {
        const { memberMobile } = req.body;
        if (!memberMobile) {
            return res.status(400).json({ error: 'Member code is required.' });
        }
        const balance = await memberService.getBalance(memberMobile);
        res.status(200).json({
            message: 'Balance retrieved successfully.',
            balance: balance
        });
    } catch (err) {
        console.error('Error in memberController.getMemberBalance:', err);
        res.status(500).json({ error: 'Failed to retrieve balance.', details: err.message });
    }
};

exports.getVoucherHistory = async (req, res) => {
    try {
        const { memberMobile } = req.body;
        if (!memberMobile) {
            return res.status(400).json({ error: 'Member code is required.' });
        }
        const vouchers = await memberService.getVouchers(memberMobile);
        res.status(200).json({
            message: 'Voucher history retrieved successfully.',
            vouchers: vouchers
        });
    } catch (err) {
        console.error('Error in memberController.getVoucherHistory:', err);
        res.status(500).json({ error: 'An error occurred while fetching voucher history.' });
    }
};