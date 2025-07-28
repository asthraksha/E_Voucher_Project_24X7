import React from 'react'
import './Brand.css'

export default function BrandCover() {
    return (
        <div class="header-content">
            <div class="logo">
                <div class="logo-icon">
                    <i class="fas fa-gift"></i>
                </div>
                <div class="logo-text">24x7 Retail</div>
            </div>
            <h1>Premium E-Voucher Portal</h1>
            <p>Discover, purchase, and redeem digital vouchers anytime, anywhere. Perfect for gifting and personal use.</p>
            <div class="actions">
                <button class="btn btn-primary" onclick="showSection('buy')">
                    <i class="fas fa-shopping-cart"></i> Buy Voucher
                </button>
                <button class="btn btn-secondary" onclick="showSection('verify')">
                    <i class="fas fa-wallet"></i> My Vouchers
                </button>
                <button class="btn btn-warning" onclick="showSection('redeem-mobile-input')">
                    <i class="fas fa-qrcode"></i> Redeem Voucher
                </button>
            </div>
        </div>
    )
}
