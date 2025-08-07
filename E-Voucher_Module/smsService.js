// smsService.js
const axios = require('axios');

// --- SMS API Credentials (Replace with your actual details) ---
// const SMS_API_USERNAME = 'MYPOS25';
// const SMS_API_PASSWORD = 'Mypos@#$2025';
// const SMS_MASK = '24x7 Retail';
// const SMS_GATEWAY_TYPE = 'dialogESms';

const SMS_API_USERNAME = 'MYPOS25';
const SMS_API_PASSWORD = 'Mypos@#$2025';
const SMS_MASK = '24x7 Retail';
const SMS_GATEWAY_TYPE = 'hutch';

// --- Token Generation Function ---
const digitalRichApiTokenGeneration = async (apiCredential) => {
    const url = "https://digitalreachapi.dialog.lk/refresh_token.php";
    try {
        const response = await axios.post(url, apiCredential, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error generating token: ${error.message}`);
    }
};

const dialogEsmsTokenGeneration = async (apiCredential) => {
    const url = "https://e-sms.dialog.lk/api/v1/login";
    try {
        const response = await axios.post(url, apiCredential, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data['token'];
    } catch (error) {
        throw new Error(`Error generating token: ${error.message}`);
    }
};

// --- SMS Sending Function ---
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

const dialogESmSSend = async (token, body) => {

    const url = "https://e-sms.dialog.lk/api/v1/sms";
    try {

        console.log(token)
        const response = await axios.post(url,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.trim()}`,
                'Accept': 'application/json'
            },
            data: body
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error sending SMS: ${error.message}`);
    }
};

// Export the functions and constants
module.exports = {
    SMS_API_USERNAME,
    SMS_API_PASSWORD,
    SMS_MASK,
    SMS_GATEWAY_TYPE,
    digitalRichApiTokenGeneration,
    digitalRichSmSSend,
    dialogEsmsTokenGeneration,
    dialogESmSSend

};
