// services/memberService.js
const memberModel = require('../models/memberModel');

exports.getBalance = async (memberMobile) => {
    return await memberModel.getAvailableBalance(memberMobile);
};

exports.getVouchers = async (memberMobile) => {
    return await memberModel.getVouchersByMobile(memberMobile);
};