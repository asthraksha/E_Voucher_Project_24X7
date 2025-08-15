// utils/smsService.js
// Your existing smsService.js code remains mostly the same, but you would
// rename it from `smsService.js` to `utils/smsService.js`
// and you would likely export a single function like `sendVoucherSMS`
// that encapsulates the logic for which gateway to use.

const axios = require('axios');

// --- SMS API Credentials ---
const SMS_API_USERNAME = 'MYPOS25';
const SMS_API_PASSWORD = 'Mypos@#$2025';
const SMS_MASK = '24x7 Retail';
const SMS_GATEWAY_TYPE = 'hutch'; // or 'dialogESms'

const digitalRichSmSSend = async (body) => {
    var name = "MKB";
    var pass = "Minimart@123";
    var mask = "MKB";
    // const url = "https://digitalreachapi.dialog.lk/camp_req.php";
    const url = `https://bulksms.hutch.lk/sendsmsmultimask.php?USER=${name}&PWD=${pass}&MASK=${mask}&NUM=${body['to']}&MSG=${body['message']}`;
    try {
        // const response = await axios.post(url, body, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         // 'Authorization': token,
        //         'Accept': 'application/json'
        //     }
        // });
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error(`Error sending SMS: ${error.message}`);
    }
};
const dialogESmSSend = async (body) => {};
const dialogEsmsTokenGeneration = async (apiCredential) => { /* ... existing code ... */ };

const sendVoucherSMS = async (recipientPhone, message) => {
    let formattedRecipientPhone = recipientPhone.replace(/\D/g, '');
    if (formattedRecipientPhone.startsWith('0')) {
        formattedRecipientPhone = '+94' + formattedRecipientPhone.substring(1);
    } else if (!formattedRecipientPhone.startsWith('+94')) {
        formattedRecipientPhone = '+94' + formattedRecipientPhone;
    }

    if (SMS_GATEWAY_TYPE === 'dialogESms') {
        const apiCredential = { "username": SMS_API_USERNAME, "password": SMS_API_PASSWORD };
        const token = await dialogEsmsTokenGeneration(apiCredential);

        const now = new Date();
        const transaction_id = now.getFullYear().toString() + String(now.getMonth() + 1).padStart(2, '0') +
            String(now.getDate()).padStart(2, '0') + String(now.getHours()).padStart(2, '0') +
            String(now.getMinutes()).padStart(2, '0') + String(now.getSeconds()).padStart(2, '0');

        const smsBody = {
            "msisdn": [{ "mobile": formattedRecipientPhone }],
            "sourceAddress": SMS_MASK,
            "message": message,
            "transaction_id": transaction_id
        };
        return await dialogESmSSend(token, smsBody);

    } else if (SMS_GATEWAY_TYPE === 'hutch') {
        const smsBody = {
            "to": formattedRecipientPhone,
            "mask": SMS_MASK,
            "message": message
        };
        return await digitalRichSmSSend(smsBody);
    } else {
        throw new Error('Unsupported SMS gateway type.');
    }
};

module.exports = {
    sendVoucherSMS,
    // You can also export other helper functions if needed
};