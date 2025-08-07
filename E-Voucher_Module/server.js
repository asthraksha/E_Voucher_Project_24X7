const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');

// Enable CORS for all requests
app.use(cors());
app.use(express.json());
const dbConfig = require('./DBConfig');

const {
    SMS_API_USERNAME,
    SMS_API_PASSWORD,
    SMS_MASK,
    digitalRichApiTokenGeneration,
    digitalRichSmSSend,
    dialogEsmsTokenGeneration,
    dialogESmSSend,
    SMS_GATEWAY_TYPE
} = require('./smsService');



app.use(express.static(path.join(__dirname, 'public')));


//when log in firts time show Cash in Balance after first loging show dynimacaly updated value
app.post('/api/member/balance', async (req, res) => {
    const { memberMobile } = req.body;
    if (!memberMobile) {
        return res.status(400).json({ error: 'Member code is required.' });
    }

    try {
        const pool = await sql.connect(dbConfig);

        // First, initialize the balance based on all cash-in transactions
        const initResult = await pool.request()
            .input('memberMobile', sql.VarChar, memberMobile)
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
    const { memberMobile, voucherAmount } = req.body;
    if (!memberMobile || !voucherAmount) {
        return res.status(400).json({ error: 'Member code and voucher amount are required.' });
    }

    try {
        const pool = await sql.connect(dbConfig);
        const request = pool.request();

        // Define an output parameter for the voucher code
        request.output('voucherCode', sql.VarChar(50));

        // Execute the stored procedure and store the result
        const result = await request
            .input('memberMobile', sql.VarChar, memberMobile)
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
    const { memberMobile } = req.body;
    if (!memberMobile) {
        return res.status(400).json({ error: 'Member code is required.' });
    }

    try {
        // Create a connection pool (or reuse an existing one if you have it)
        const pool = await sql.connect(dbConfig);

        // Create a new request object from the pool
        const request = pool.request();

        // Now you can use the request object's methods
        request.input('MemberMobile', sql.VarChar(20), memberMobile);
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

// app.post('/api/voucher/assign', async (req, res) => {
//     const { voucherCode, recipientPhone, recipientEmail, specialMessage } = req.body;

//     if (!voucherCode) {
//         return res.status(400).json({ error: 'Voucher code is required.' });
//     }
//     if (!recipientPhone && !recipientEmail) {
//         return res.status(400).json({ error: 'Recipient phone or email is required.' });
//     }

//     try {
//         const pool = await sql.connect(dbConfig);
//         const request = pool.request();

//         request.input('VoucherCode', sql.VarChar(50), voucherCode);
//         request.input('RecipientPhone', sql.VarChar(20), recipientPhone || null);
//         request.input('RecipientEmail', sql.VarChar(100), recipientEmail || null);
//         request.input('SpecialMessage', sql.NVarChar(255), specialMessage || null);

//         const result = await request.execute('sp_AssignVoucher');

//         const assignmentLink = result.recordset[0].ASSIGNMENT_LINK;
//         console.log(`Voucher assignment successful. Link sent to ${recipientEmail || recipientPhone}: ${assignmentLink}`);

//         res.status(200).json({
//             message: 'Voucher assigned and link sent successfully.',
//             assignmentLink: assignmentLink
//         });
//     } catch (err) {
//         console.error('Error assigning voucher:', err);
//         res.status(500).json({ error: 'An error occurred while assigning the voucher.' });
//     }
// });

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
        console.log(`Voucher assignment successful. Link sent to ${recipientPhone}: ${assignmentLink}`);

        // --- NEW SMS INTEGRATION LOGIC ---
        // Only send an SMS if a recipient phone number was provided
        if (recipientPhone) {
            try {
                // 1. Prepare credentials for token generation
                const apiCredential = {
                    "username": SMS_API_USERNAME,
                    "password": SMS_API_PASSWORD
                };

                if (SMS_GATEWAY_TYPE == 'dialogESms') {
                    // 1. Prepare credentials for token generation
                    const apiCredential = {
                        "username": SMS_API_USERNAME,
                        "password": SMS_API_PASSWORD
                    };
                    // 2. Generate the API token
                    const tokenResponse = await dialogEsmsTokenGeneration(apiCredential);
                    console.log(tokenResponse);


                    // 3. Construct the SMS message body
                    let formattedRecipientPhone = recipientPhone.replace(/\D/g, ''); // Remove non-digits
                    if (formattedRecipientPhone.startsWith('0')) {
                        formattedRecipientPhone = '+94' + formattedRecipientPhone.substring(1);
                    } else if (!formattedRecipientPhone.startsWith('94')) {
                        // Assuming numbers without a country code are local
                        formattedRecipientPhone = '+94' + formattedRecipientPhone;
                    }
                    console.log('Ado:', formattedRecipientPhone)
                    const smsMessage = `${specialMessage || 'You have a new voucher!'}\n Redeem your voucher here: ${assignmentLink}`;

                    const now = new Date();

                    const formatted = now.getFullYear().toString() +
                        String(now.getMonth() + 1).padStart(2, '0') +
                        String(now.getDate()).padStart(2, '0') +
                        String(now.getHours()).padStart(2, '0') +
                        String(now.getMinutes()).padStart(2, '0') +
                        String(now.getSeconds()).padStart(2, '0');
                    const smsBody = {
                        "msisdn": [{
                            "mobile": formattedRecipientPhone
                        }], formattedRecipientPhone,
                        "sourceAddress": SMS_MASK,
                        "message": smsMessage,
                        "transaction_id": formatted
                    };

                    // 4. Send the SMS
                    const smsResult = await dialogESmSSend(tokenResponse, smsBody);
                    console.log('SMS sent successfully:', smsResult);
                } else if (SMS_GATEWAY_TYPE == 'hutch') {
                    // 2. Generate the API token
                    // const tokenResponse = await digitalRichApiTokenGeneration(apiCredential);
                    // console.log(tokenResponse);
                    // const token = tokenResponse.token_type + " " + tokenResponse.access_token;

                    // 3. Construct the SMS message body
                    
                    let formattedRecipientPhone = recipientPhone.replace(/\D/g, ''); // Remove non-digits
                    if (formattedRecipientPhone.startsWith('0')) {
                        formattedRecipientPhone = '+94' + formattedRecipientPhone.substring(1);
                    } else if (!formattedRecipientPhone.startsWith('94')) {
                        // Assuming numbers without a country code are local
                        formattedRecipientPhone = '+94' + formattedRecipientPhone;
                    }
                    console.log('Ado:', formattedRecipientPhone)
                    const smsMessage = `${specialMessage || 'You have a new voucher!'}\n Redeem your voucher here: ${assignmentLink}`;

                    const smsBody = {
                        "to": formattedRecipientPhone,
                        "mask": SMS_MASK,
                        "message": smsMessage
                    };

                    // 4. Send the SMS
                    const smsResult = await digitalRichSmSSend(smsBody);
                    console.log('SMS sent successfully:', smsResult);
                }




            } catch (smsError) {
                // Log SMS error but don't fail the entire request
                console.error('Error sending SMS:', smsError.message);
                // The main voucher assignment still succeeded, so we can continue
            }
        }

        res.status(200).json({
            message: 'Voucher assigned and link sent successfully.',
            assignmentLink: assignmentLink
        });
    } catch (err) {
        console.error('Error assigning voucher:', err);
        res.status(500).json({ error: 'An error occurred while assigning the voucher.' });
    }
});

app.get('/api/voucher/:voucherCode', async (req, res) => {
    try {
        const { voucherCode } = req.params;

        // Ensure we have a voucher code
        if (!voucherCode) {
            return res.status(400).json({ error: 'Voucher code is required' });
        }

        // Connect to the database
        await sql.connect(dbConfig);
        const request = new sql.Request();

        // Pass the voucher code to the stored procedure
        request.input('VoucherCode', sql.NVarChar(50), voucherCode);

        // Execute the stored procedure
        const result = await request.execute('GetVoucherDetails');

        // Check if a voucher was found
        if (result.recordset.length > 0) {
            // Return the first record as a JSON object
            res.json(result.recordset[0]);
        } else {
            // No voucher found with that code
            res.status(404).json({ error: 'Voucher not found' });
        }

    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Server error' });
    } finally {
        // Always close the connection pool
        sql.close();
    }
});

app.get('/voucher/redeem', (req, res) => {
    // We simply send the HTML file. The client-side JS will handle the data fetching.
    res.sendFile(path.join(__dirname, 'public', 'frontend', 'voucher.html'));
});


// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});


