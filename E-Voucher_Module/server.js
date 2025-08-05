const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS for all requests
app.use(cors());
app.use(express.json());
const dbConfig = require('./DBConfig');


//when log in firts time show Cash in Balance after first loging show dynimacaly updated value
app.post('/api/member/balance', async (req, res) => {
    const { memberCode } = req.body;
    if (!memberCode) {
        return res.status(400).json({ error: 'Member code is required.' });
    }

    try {
        const pool = await sql.connect(dbConfig);

        // First, initialize the balance based on all cash-in transactions
        const initResult = await pool.request()
            .input('memberCode', sql.VarChar, memberCode)
            .execute('SP_INITIALIZE_BALANCE');

        // The stored procedure returns the current balance, so we can use the result directly
        const balance = initResult.recordset[0].AVAILABLE_BALANCE; 
        res.status(200).json({
            message: 'Balance retrieved successfully.',
            balance: balance
        });
    } catch (err) {
        console.error('SQL error:', err);
        res.status(500).json({ error: 'Failed to retrieve balance.', details: err.message });
    }
});




// =====================================================================================================
// API Endpoint to create a new voucher and deduct the amount from the member's balance.
// =====================================================================================================

app.post('/api/voucher/create', async (req, res) => {
    const { memberCode, voucherAmount } = req.body;
    if (!memberCode || !voucherAmount) {
        return res.status(400).json({ error: 'Member code and voucher amount are required.' });
    }

    try {
        const pool = await sql.connect(dbConfig);
        const request = pool.request();
        
        // Define an output parameter for the voucher code
        request.output('voucherCode', sql.VarChar(50));
        
        // Execute the stored procedure and store the result
        const result = await request
            .input('memberCode', sql.VarChar, memberCode)
            .input('voucherAmount', sql.Decimal(18, 2), voucherAmount)
            .execute('SP_CREATE_VOUCHER');

        // Access the output parameter from the 'result' object
        const newVoucherCode = result.output.voucherCode;
        
        if (newVoucherCode) {
            res.status(200).json({
                message: `Voucher created successfully.`,
                voucherCode: newVoucherCode
            });
        } else {
             // Handle cases where the stored procedure might not return a voucher code
            res.status(500).json({ error: 'Failed to retrieve voucher code after creation.' });
        }
    } catch (err) {
        console.error('SQL error:', err);
        res.status(500).json({ error: 'Failed to create voucher.', details: err.message });
    }
});

app.post('/api/member/vouchers', async (req, res) => {
    const { memberCode } = req.body;
    if (!memberCode) {
        return res.status(400).json({ error: 'Member code is required.' });
    }

    try {
        // Create a connection pool (or reuse an existing one if you have it)
        const pool = await sql.connect(dbConfig);

        // Create a new request object from the pool
        const request = pool.request();

        // Now you can use the request object's methods
        request.input('MemberCode', sql.VarChar(20), memberCode);
        const result = await request.execute('sp_GetVouchersByMemberCode');

        res.status(200).json({
            message: 'Voucher history retrieved successfully.',
            vouchers: result.recordset
        });

    } catch (err) {
        console.error('Error fetching vouchers:', err);
        res.status(500).json({ error: 'An error occurred while fetching voucher history.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});


