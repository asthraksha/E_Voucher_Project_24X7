# E_Voucher_Project_24X7
Junior E Voucher Module

24x7 Retail E-Voucher Portal
This project is a simple, single-page web application simulating a premium e-voucher portal for 24x7 Retail. It allows users to purchase, allocate, and redeem digital vouchers with a focus on a clean, responsive user interface and a mock backend for demonstration purposes.

✨ Features
User-Friendly Interface: Clean and intuitive design with responsive layouts for various devices.

Voucher Purchase:

Select from predefined voucher denominations.

Specify quantity for bulk purchases.

Shopping cart functionality with total amount and quantity.

Support for Voucher Bundles: Purchase a bundle (e.g., Rs. 1,000 bundle for two Rs. 500 vouchers) which then breaks down into individual child vouchers for allocation/redemption.

Voucher Allocation:

Allocate newly purchased vouchers to a recipient's mobile number.

Add a personalized message to allocated vouchers.

Option to keep vouchers for oneself (allocate to buyer's mobile).

My Vouchers View:

Verify ownership via mobile number and OTP (mocked).

Displays all active, unredeemed vouchers owned by the user.

Grouped Vouchers: Multiple vouchers allocated to the same mobile number with the exact same message are grouped under an expandable summary card, showing total value and the shared message.

Individual voucher cards display value, ID, type, and any personalized message.

QR code generation for each voucher (mocked for visual representation).

Voucher Redemption:

Verify redemption via mobile number and OTP (mocked).

Select individual vouchers for redemption.

Supports partial redemption: Redeem a portion of a voucher's value, with the remaining balance issued as a new voucher.

Displays total selected value for redemption.

Toast Notifications: Provides real-time feedback for user actions (success, error, info).

Loading Indicators: Visual feedback during simulated asynchronous operations.

🚀 How to Use
This project is a single HTML file with embedded CSS and JavaScript, making it incredibly easy to run.

Save the Code: Copy the entire code content into a file named index.html.

Open in Browser: Open the index.html file using any modern web browser (e.g., Chrome, Firefox, Edge).

The application will load in your browser, and you can start interacting with it immediately.

📊 Mock Data
The application uses a mockDatabase JavaScript object to simulate backend storage for users and vouchers. This data is reset each time the page is refreshed.

Pre-existing Data for Testing:

User: 9876543210 (Alice Smith)

Has a Rs. 1,000 voucher ("Happy Birthday! Enjoy your gift.")

Has a Rs. 5,000 voucher ("A token of our appreciation!")

Has two Rs. 500 vouchers (part of a bundle, "Part of a bundle gift!")

User: 1234567890 (Bob Johnson)

Has a Rs. 2,500 promotional voucher.

User: 9998887776 (Charlie Brown)

Can be used as a buyer for new purchases.

OTP Simulation:
When you enter a mobile number and click "Send OTP", a mock 6-digit OTP will be printed to your browser's developer console (F12 or Ctrl+Shift+I, then go to "Console" tab). Use this OTP to proceed with verification.

💡 Future Enhancements
Multi-Voucher Redemption: Implement functionality to redeem multiple selected vouchers simultaneously.

Advanced Bundle Options: Allow users to create custom bundles or offer more dynamic bundle configurations.

Search and Filter: Add search and filter options for "My Vouchers" and "Redeem Voucher" sections.

User Authentication: Integrate with a real authentication system (e.g., Firebase Auth) instead of mock OTP.

Persistent Storage: Connect to a real database (e.g., Firebase Firestore) to persist data across sessions.

Transaction History: Display a history of purchases, allocations, and redemptions.

Admin Panel: A separate interface for managing vouchers, users, and transactions.

Improved Error Handling: More robust error messages and user guidance.

Animations: Enhance UI with more subtle and engaging animations.
