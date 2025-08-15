// models/voucherModel.js
const db = require("../db");
const sql = require("mssql");

exports.createNewVoucher = async (memberMobile, voucherAmount) => {
  try {
    const pool = db.getPool();
    const request = pool.request();
    const test = request.output("voucherCode", sql.VarChar(50));
    console.log("test:", test);
    const result = await request
      .input("memberMobile", sql.VarChar, memberMobile)
      .input("voucherAmount", sql.Decimal(18, 2), voucherAmount)
      .execute("SP_CREATE_VOUCHER");

    const newVoucherCode = result.output.voucherCode;
    if (newVoucherCode) {
      return newVoucherCode;
      request.output.voucherCode = newVoucherCode;
    } else {
      throw new Error("Failed to create voucher code");
    }
    // console.log('Voucher created with code:', request.output.voucherCode);
    // return request.output.voucherCode;
  } catch (error) {
    console.error("Error creating voucher:", error);
    throw error;
  }
};

exports.assignVoucherToRecipient = async (
  voucherCode,
  voucherAmount,
  recipientPhone,
  recipientEmail,
  specialMessage
) => {
  const pool = db.getPool();
  const request = pool.request();
  const result = await request
    .input("VoucherCode", sql.VarChar(50), voucherCode)
    .input("VoucherAmount", sql.Decimal(18, 2), voucherAmount || null)
    .input("RecipientPhone", sql.VarChar(20), recipientPhone || null)
    .input("RecipientEmail", sql.VarChar(100), recipientEmail || null)
    .input("SpecialMessage", sql.NVarChar(255), specialMessage || null)
    .execute("sp_AssignVoucher");
  return result.recordset[0].ASSIGNMENT_LINK;
};

exports.getVoucherDetailsByCode = async (voucherCode) => {
  const pool = db.getPool();
  const request = pool.request();
  request.input("VoucherCode", sql.NVarChar(50), voucherCode);
  const result = await request.execute("GetVoucherDetails");
  return result.recordset.length > 0 ? result.recordset[0] : null;
};
