🚀 E-Voucher System
Project Overview
This project is an E-Voucher system that allows customers to manage their balances, create vouchers, and assign them to others. This README provides instructions for setting up the database, configuring the application, and a general overview of the system's functionality.

1. 🛠️ Getting Started
   
Database Restoration
To get the application running, you'll first need to restore the database. The necessary stored procedures and table structures have been provided for you to update the database.

SQL Server Configuration

  After restoring the database, enable the network protocols and set up a static IP address:
  Open SQL Server Configuration Manager.
  Enable the necessary network protocols (e.g., TCP/IP).
  Configure the pipeline to use a static IP address.

Application Configuration
Update the dbConfig.js file with your specific database connection details.

JavaScript

// dbConfig.js
const config = {
  user: 'pll',
  password: 'myposadminauthentication',
  server: '127.0.0.1', // Update with your static IP or server address
  database: '24X7_DB',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

module.exports = config;
Note: Ensure the server field is updated with your static IP address.

2. 📝 System Functionality
   
The E-Voucher system is a POS-integrated application that handles customer balances and voucher management.

Balance Management

  * Customers can check their balance by entering their phone number into the E-Voucher system and clicking the "Get Balance" button.
  * If the customer's phone number exists in the T_CUSTOMER_BALANCE table, their balance is updated with the HED_NETAMT from the T_TBLINVHEADER table.
  * If the customer is new, a new record is created in the T_CUSTOMER_BALANCE table.
  * A test customer number is available for system testing: +94741992994.

Voucher Creation

  * After checking their balance, a customer can create a new voucher by entering the desired amount and clicking "Create Voucher". This process automatically updates the customer's balance.
  * A unique, random voucher code is generated, and a new record is added to the T_VOUCHER table with the voucher amount.

Viewing Vouchers
  
  * Customers can view all their created vouchers by clicking the "Show Voucher" button.
  * This displays a list of vouchers with their details and current status (e.g., Assigned or Not Assigned). The data is retrieved directly from the T_VOUCHER table.

Voucher Assignment

  * To assign a voucher, a customer clicks the "Assign" button next to a specific voucher.
  * The customer enters the recipient's phone number, email, and an optional message.
  * Clicking "Send" triggers the backend to create a unique URL and send it to the recipient's mobile number via SMS.
  * A new record is added to the T_VOUCHER_ASSIGNMENTS table with the recipient's details.

The recipient can then click on the link to view the voucher details, including a QR code. The URL format is as follows:

  http://69.197.150.166:3000/voucher.html?id=44223F56-2210-4BEC-A668-54E9C1563633
