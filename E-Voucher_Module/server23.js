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
    // The stored procedure now expects 'memberMOBILE', so we'll use that from the request body.
    const { memberMOBILE } = req.body; 

    if (!memberMOBILE) {
        return res.status(400).json({ error: 'Member mobile number is required.' });
    }

    try {
        const pool = await sql.connect(dbConfig);

        // Call the stored procedure, passing the memberMOBILE as the parameter.
        const initResult = await pool.request()
            .input('memberMOBILE', sql.VarChar, memberMOBILE) // Changed parameter name to match SP
            .execute('SP_INITIALIZE_BALANCE');

        // The stored procedure returns the current balance in its first recordset.
        // We access it using the column name 'AVAILABLE_BALANCE'.
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
    const { memberMOBILE, voucherAmount } = req.body;
    if (!memberMOBILE || !voucherAmount) {
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

app.post('/api/voucher/assign', async (req, res) => {
    const { voucherCode, recipientPhone, recipientEmail, specialMessage } = req.body;
    
    if (!voucherCode) {
        return res.status(400).json({ error: 'Voucher code is required.' });
    }
    if (!recipientPhone && !recipientEmail) {
        return res.status(400).json({ error: 'Recipient phone or email is required.' });
    }

    try {
        const pool = await sql.connect(dbConfig);
        const request = pool.request();
        
        request.input('VoucherCode', sql.VarChar(50), voucherCode);
        request.input('RecipientPhone', sql.VarChar(20), recipientPhone || null);
        request.input('RecipientEmail', sql.VarChar(100), recipientEmail || null);
        request.input('SpecialMessage', sql.NVarChar(255), specialMessage || null);
        
        const result = await request.execute('sp_AssignVoucher');

        const assignmentLink = result.recordset[0].ASSIGNMENT_LINK;
        console.log(`Voucher assignment successful. Link sent to ${recipientEmail || recipientPhone}: ${assignmentLink}`);

        res.status(200).json({
            message: 'Voucher assigned and link sent successfully.',
            assignmentLink: assignmentLink
        });
    } catch (err) {
        console.error('Error assigning voucher:', err);
        res.status(500).json({ error: 'An error occurred while assigning the voucher.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});


