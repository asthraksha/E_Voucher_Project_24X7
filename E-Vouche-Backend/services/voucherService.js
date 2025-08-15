// services/voucherService.js
const voucherModel = require('../models/voucherModel');
const smsService = require('../utils/smsService'); // Correct path to your smsService.js

exports.createVoucher = async (memberMobile, voucherAmount) => {
    console.log('Creating voucher for member service:', memberMobile, 'with amount:', voucherAmount);
    const voucherCode = await voucherModel.createNewVoucher(memberMobile, voucherAmount);
    console.log('Voucher code created in service:', voucherCode);
    return voucherCode;
};

exports.assignVoucher = async (voucherCode, voucherAmount, recipientPhone, recipientEmail, specialMessage) => {
    const assignmentLink = await voucherModel.assignVoucherToRecipient(
        voucherCode,
        voucherAmount,
        recipientPhone,
        recipientEmail,
        specialMessage
    );

    // If a phone is provided, send an SMS
    if (recipientPhone) {
        try {
            const smsMessage = `${specialMessage || 'You have a new voucher!'}\n Redeem your voucher here: ${assignmentLink}`;
            await smsService.sendVoucherSMS(recipientPhone, smsMessage);
            console.log('SMS sent successfully to:', recipientPhone);
        } catch (smsError) {
            console.error('Error sending SMS:', smsError.message);
            // Log the error but don't fail the entire request
        }
    }

    return assignmentLink;
};