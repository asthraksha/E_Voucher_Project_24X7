// models/memberModel.js
const db = require('../db');
const sql = require('mssql');

exports.getAvailableBalance = async (memberMobile) => {
    const pool = db.getPool();
    const result = await pool.request()
        .input('memberMobile', sql.VarChar, memberMobile)
        .execute('SP_INITIALIZE_BALANCE');
    return result.recordset[0].AVAILABLE_BALANCE;
};

exports.getVouchersByMobile = async (memberMobile) => {
    const pool = db.getPool();
    const result = await pool.request()
        .input('MemberMobile', sql.VarChar(20), memberMobile)
        .execute('sp_GetVouchersByMemberCode');
    return result.recordset;
};