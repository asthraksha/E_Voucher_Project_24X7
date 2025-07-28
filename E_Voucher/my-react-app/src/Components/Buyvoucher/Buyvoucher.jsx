import React, { useState, useEffect } from 'react';
import './Buyvoucher.css'

// Main App component to wrap Buyvoucher for demonstration purposes
// In a real application, Buyvoucher would be rendered by a router or parent component


export default function Buyvoucher() {
  // State for form inputs
  const [buyerMobileNumber, setBuyerMobileNumber] = useState('');
  const [voucherAmount, setVoucherAmount] = useState(''); // Default to empty string for "Select voucher amount"
  const [voucherQuantity, setVoucherQuantity] = useState(1);

  // State for cart items and totals
  const [cartItems, setCartItems] = useState([]);
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);

  // State for messages (replacing alert())
  const [message, setMessage] = useState({ text: '', type: '' }); // type: 'success', 'error', 'info'

  // Effect to update cart totals whenever cartItems changes
  useEffect(() => {
    const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmt = cartItems.reduce((sum, item) => sum + (item.amount * item.quantity), 0);
    setCartTotalQuantity(totalQty);
    setCartTotalAmount(totalAmt);
  }, [cartItems]);

  // Function to display messages
  const showMessage = (text, type) => {
    setMessage({ text, type });
    const timer = setTimeout(() => {
      setMessage({ text: '', type: '' });
    }, 3000); // Message disappears after 3 seconds
    return () => clearTimeout(timer); // Cleanup on unmount
  };

  const goHome = () => {
    showMessage("Navigating back to the home page...", 'info');
    // In a real application, you would use a routing library here, e.g.:
    // navigate('/');
  };

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!voucherAmount || !voucherQuantity) {
      showMessage("Please select a voucher amount and quantity.", 'error');
      return;
    }

    const newVoucher = {
      id: Date.now(), // Unique ID for the item
      amount: parseInt(voucherAmount),
      quantity: parseInt(voucherQuantity),
      mobile: buyerMobileNumber // Store mobile number with each item for simplicity, or once globally
    };

    // Check if the same voucher amount already exists in the cart
    const existingItemIndex = cartItems.findIndex(item => item.amount === newVoucher.amount);

    if (existingItemIndex > -1) {
      // If exists, update quantity
      const updatedCart = cartItems.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + newVoucher.quantity }
          : item
      );
      setCartItems(updatedCart);
    } else {
      // Otherwise, add new item
      setCartItems([...cartItems, newVoucher]);
    }

    showMessage(`Added Rs. ${newVoucher.amount} x ${newVoucher.quantity} to cart!`, 'success');
    // Optionally reset form fields after adding to cart
    setVoucherAmount('');
    setVoucherQuantity(1);
  };

  const handleClearCart = () => {
    setCartItems([]);
    showMessage("Your cart has been cleared.", 'info');
  };

  const handleProceedToPayment = () => {
    if (cartItems.length === 0) {
      showMessage("Your cart is empty. Please add items before proceeding.", 'error');
      return;
    }
    showMessage(`Proceeding to payment for total Rs. ${cartTotalAmount}...`, 'success');
    // Here you would integrate with a payment gateway or navigate to a payment page.
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    showMessage("Item removed from cart.", 'info');
  };

  return (
    <div id="buy" className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg mx-auto transform transition-all duration-300 hover:shadow-2xl">
      <button
        className="back-btn flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-4 rounded-md p-2"
        onClick={goHome}
      >
        <i className="fas fa-arrow-left mr-2"></i> Back
      </button>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Purchase E-Vouchers</h2>

      {message.text && (
        <div className={`p-3 mb-4 rounded-md text-center ${
          message.type === 'success' ? 'bg-green-100 text-green-700' :
          message.type === 'error' ? 'bg-red-100 text-red-700' :
          'bg-blue-100 text-blue-700'
        }`}>
          {message.text}
        </div>
      )}
            
      <div className="flex flex-col items-center justify-center mb-6">
        <i className="fas fa-shopping-bag text-6xl text-blue-400 mb-4 process-graphic"></i>
        <p className="text-gray-600 text-center process-message">
          Select the voucher amount and quantity to add to your cart. Multiple vouchers can be purchased in one transaction.
        </p>
      </div>
            
      <form id="addToCartForm" className="space-y-4" onSubmit={handleAddToCart}>
        <div className="form-group">
          <label htmlFor="buyerMobileNumber" className="block text-gray-700 text-sm font-semibold mb-2">Your Mobile Number</label>
          <input
            type="tel"
            id="buyerMobileNumber"
            className="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            placeholder="For receipt and allocation (e.g., 9876543210)"
            pattern="[0-9]{10}"
            title="Please enter a 10-digit mobile number"
            value={buyerMobileNumber}
            onChange={(e) => setBuyerMobileNumber(e.target.value)}
            required
          />
        </div>
                
        <div className="form-group">
          <label htmlFor="voucherAmount" className="block text-gray-700 text-sm font-semibold mb-2">Voucher Amount</label>
          <select
            id="voucherAmount"
            className="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 appearance-none bg-white pr-8"
            value={voucherAmount} // Controlled component: value dictates selected option
            onChange={(e) => setVoucherAmount(e.target.value)}
            required
          >
            <option value="" disabled>Select voucher amount</option> {/* Removed 'selected' */}
            <option value="100">Rs. 100</option>
            <option value="200">Rs. 200</option>
            <option value="500">Rs. 500</option>
            <option value="1000">Rs. 1,000</option>
            <option value="2000">Rs. 2,000</option>
            <option value="2500">Rs. 2,500</option>
            <option value="5000">Rs. 5,000</option>
            <option value="10000">Rs. 10,000</option>
          </select>
        </div>
                
        <div className="form-group">
          <label htmlFor="voucherQuantity" className="block text-gray-700 text-sm font-semibold mb-2">Quantity</label>
          <input
            type="number"
            id="voucherQuantity"
            className="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            min="1"
            value={voucherQuantity} // Controlled component
            onChange={(e) => setVoucherQuantity(parseInt(e.target.value) || 1)} // Ensure it's a number, default to 1
            required
          />
        </div>
                
        <button
          type="submit"
          className="btn btn-secondary w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
          id="addToCartBtn"
        >
          <i className="fas fa-cart-plus mr-2"></i> Add to Cart
        </button>
      </form>

      <div id="cartSummary" className="mt-8 p-6 bg-gray-50 rounded-lg shadow-inner">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Your Shopping Cart</h3>
        <div id="cartItems" className="mt-2 space-y-3">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center italic">Your cart is empty</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center p-3 bg-white rounded-md shadow-sm border border-gray-200">
                <span className="text-gray-700 font-medium">
                  Rs. {item.amount} x {item.quantity}
                </span>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200 p-1 rounded-full hover:bg-red-100"
                  title="Remove item"
                >
                  <i className="fas fa-times-circle"></i>
                </button>
              </div>
            ))
          )}
        </div>
                
        <div className="cart-summary flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
          <span className="text-gray-700">Total Vouchers: <strong className="text-blue-600" id="cartTotalQuantity">{cartTotalQuantity}</strong></span>
          <span className="text-gray-700">Total Amount: <strong className="text-blue-600">Rs. <span id="cartTotalAmount">{cartTotalAmount}</span></strong></span>
        </div>
                
        <div className="cart-actions flex justify-between space-x-4 mt-6">
          <button
            type="button"
            className="btn btn-danger flex-1 bg-red-500 text-white py-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleClearCart}
            disabled={cartItems.length === 0}
          >
            <i className="fas fa-trash mr-2"></i> Clear Cart
          </button>
          <button
            type="button"
            className="btn btn-success flex-1 bg-green-500 text-white py-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleProceedToPayment}
            id="proceedToPaymentBtn"
            disabled={cartItems.length === 0}
          >
            <i className="fas fa-lock mr-2"></i> Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
