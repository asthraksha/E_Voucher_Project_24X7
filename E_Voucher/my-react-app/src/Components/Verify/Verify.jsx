import React from 'react'
import './Verify.css'

export default function Verify() {
    return (
        <div id="verify">
            <button className="back-btn" onclick="goHome()">
                <i className="fas fa-arrow-left"></i> Back
            </button>
            <h2>Verify with Mobile Number</h2>

            <i className="fas fa-mobile-alt process-graphic"></i>
            <p className="process-message">Enter your mobile number to access your vouchers. We'll send an OTP for verification.</p>

            <form id="verifyUserForm" onsubmit="verifyUser(event)" className="mt-3">
                <div className="form-group">
                    <label for="mobileNumberVerify">Mobile Number</label>
                    <input type="tel" id="mobileNumberVerify" className="form-control" placeholder="e.g., 9876543210" pattern="[0-9]{10}" title="Please enter a 10-digit mobile number" required/>
                </div>
                <button className="btn btn-primary" type="submit" id="verifyUserBtn">
                    <i className="fas fa-paper-plane"></i> Send OTP
                </button>
            </form>
            <div id="otpInputGroup" className="form-group mt-4 d-none">
                <label for="verifyOtpInput">Enter OTP sent to <span id="otpSentMobileVerify"></span></label>
                <input type="text" id="verifyOtpInput" className="form-control" placeholder="Enter 6-digit OTP" pattern="[0-9]{6}" title="Please enter a 6-digit OTP"/>
                    <button className="btn btn-success mt-3" onclick="confirmOtp('verify')" id="confirmVerifyOtpBtn">
                        <i className="fas fa-check"></i> Confirm OTP
                    </button>
            </div>
        </div>

    )
}
