import React from 'react'

export default function Redeem() {
  return (
    <section id="redeem-mobile-input">
            <button class="back-btn" onclick="goHome()">
                <i class="fas fa-arrow-left"></i> Back
            </button>
            <h2>Redeem Your Vouchers</h2>
            
            <i class="fas fa-mobile process-graphic"></i>
            <p class="process-message">Enter your mobile number to find your redeemable vouchers. You can redeem full or partial amounts.</p>
            
            <form id="redeemMobileForm" onsubmit="verifyRedeemMobile(event)" class="mt-3">
                <div class="form-group">
                    <label for="redeemMobileNumber">Mobile Number</label>
                    <input type="tel" id="redeemMobileNumber" class="form-control" placeholder="Enter your registered mobile number (e.g., 9876543210)" pattern="[0-9]{10}" title="Please enter a 10-digit mobile number" required/>
                </div>
                <button class="btn btn-primary" type="submit" id="findRedeemVouchersBtn">
                    <i class="fas fa-search"></i> Find Vouchers
                </button>
            </form>
            <div id="redeemOtpInputGroup" class="form-group mt-4 d-none">
                <label for="redeemOtpInput">Enter OTP sent to <span id="otpSentMobileRedeem"></span></label>
                <input type="text" id="redeemOtpInput" class="form-control" placeholder="Enter 6-digit OTP" pattern="[0-9]{6}" title="Please enter a 6-digit OTP"/>
                <button class="btn btn-success mt-3" onclick="confirmOtp('redeem')" id="confirmRedeemOtpBtn">
                    <i class="fas fa-check"></i> Confirm OTP
                </button>
            </div>
        </section>

  )
}
