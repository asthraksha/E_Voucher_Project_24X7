// controllers/voucherController.js
const voucherService = require('../services/voucherService');
const voucherModel = require('../models/voucherModel');

exports.createVoucher = async (req, res) => {
    const { memberMobile, voucherAmount } = req.body;
    if (!memberMobile || !voucherAmount) {
        return res.status(400).json({ error: 'Member code and voucher amount are required.' });
    }
    console.log('Creating voucher for member:', memberMobile, 'with amount:', voucherAmount);

    try {
        const newVoucherCode = await voucherService.createVoucher(memberMobile, voucherAmount);
        console.log('New voucher code created:', newVoucherCode);

        if (newVoucherCode) {
            res.status(200).json({
                message: `Voucher created successfully.`,
                voucherCode: newVoucherCode
            });
        } else {
            res.status(500).json({ error: 'Failed to retrieve voucher code after creation.' });
        }
    } catch (err) {
        console.error('Error in voucherController.createVoucher:', err);
        res.status(500).json({ error: 'Failed to create voucher.', details: err.message });
    }
};

exports.assignVoucher = async (req, res) => {
    const { voucherCode, voucherAmount, recipientPhone, recipientEmail, specialMessage } = req.body;

    if (!voucherCode) {
        return res.status(400).json({ error: 'Voucher code is required.' });
    }
    if (!recipientPhone && !recipientEmail) {
        return res.status(400).json({ error: 'Recipient phone or email is required.' });
    }

    try {
        const assignmentLink = await voucherService.assignVoucher(
            voucherCode,
            voucherAmount,
            recipientPhone,
            recipientEmail,
            specialMessage
        );

        res.status(200).json({
            message: 'Voucher assigned and link sent successfully.',
            assignmentLink: assignmentLink
        });
    } catch (err) {
        console.error('Error in voucherController.assignVoucher:', err);
        res.status(500).json({ error: 'An error occurred while assigning the voucher.' });
    }
};

exports.getVoucherDetails = async (req, res) => {
    try {
        const { voucherCode } = req.params;

        if (!voucherCode) {
            return res.status(400).json({ error: 'Voucher code is required' });
        }

        const voucherDetails = await voucherModel.getVoucherDetailsByCode(voucherCode);

        if (voucherDetails) {
            res.json(voucherDetails);
        } else {
            res.status(404).json({ error: 'Voucher not found' });
        }

    } catch (err) {
        console.error('Error in voucherController.getVoucherDetails:', err);
        res.status(500).json({ error: 'Server error' });
    }
};