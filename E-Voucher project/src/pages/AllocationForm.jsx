import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Gift, Send, Plus, Minus } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const occasions = [
  { value: 'birthday', label: 'Birthday', message: 'Wishing you a very Happy Birthday! May all your dreams come true!' },
  { value: 'anniversary', label: 'Anniversary', message: 'Congratulations on your special anniversary! Here\'s to many more years of happiness!' },
  { value: 'valentine', label: 'Valentine\'s Day', message: 'Happy Valentine\'s Day! You mean the world to me!' },
  { value: 'graduation', label: 'Graduation', message: 'Congratulations on your graduation! Your hard work has paid off!' },
  { value: 'wedding', label: 'Wedding', message: 'Wishing you a lifetime of love and happiness together!' },
  { value: 'christmas', label: 'Christmas', message: 'Merry Christmas! May this season bring you joy and peace!' },
  { value: 'other', label: 'Other', message: 'Hope this brings a smile to your face!' }
];

const AllocationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    receiverName: '',
    mobileNumber: '',
    email: '',
    sendWhen: 'now',
    scheduleDate: '',
    scheduleTime: '',
    occasion: 'birthday',
    customMessage: occasions[0].message,
    voucherAmount: 1000,
    quantity: 1
  });

  // const handleInputChange = (field, value) => {
  //   // Validate mobile number to allow only numbers
  //   if (field === 'mobileNumber') {
  //     value = value.replace(/[^0-9]/g, '');
  //   }
  
  //   // Validate receiver's name to allow only letters and spaces
  //   if (field === 'receiverName') {
  //     value = value.replace(/[^A-Za-z\s]/g, ''); 
  //   }
  
  //   setFormData(prev => {
  //     const updated = { ...prev, [field]: value };
      
  //     // Update default message when occasion changes
  //     if (field === 'occasion') {
  //       const selectedOccasion = occasions.find(o => o.value === value);
  //       updated.customMessage = selectedOccasion?.message || '';
  //     }
      
  //     return updated;
  //   });
  // };
  
  const handleInputChange = (field, value) => {
    // Mobile number: fixed +94 and exactly 10 digits
    if (field === 'mobileNumber') {
      // Remove non-digits
      value = value.replace(/[^0-9]/g, '');
  
      // Ensure it starts with +94 and limit to 10 digits after
      if (!value.startsWith('94')) {
        value = '94' + value;
      }
      value = value.substring(0, 12); // '94' + max 10 digits
      value = '+' + value; // Add plus sign in front
    }
  
    // Receiver name: only letters and spaces
    if (field === 'receiverName') {
      value = value.replace(/[^A-Za-z\s]/g, '');
    }
  
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
  
      // Update default message when occasion changes
      if (field === 'occasion') {
        const selectedOccasion = occasions.find(o => o.value === value);
        updated.customMessage = selectedOccasion?.message || '';
      }
  
      return updated;
    });
  };
  

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, formData.quantity + change);
    handleInputChange('quantity', newQuantity);
  };

  const handleAmountChange = (amount) => {
    handleInputChange('voucherAmount', amount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store form data in localStorage or pass to next page
    localStorage.setItem('allocationData', JSON.stringify(formData));
    navigate('/vouchers');
  };

  const amountOptions = [500, 1000, 2000, 5000, 10000];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Allocation Process</h1>
            <p className="text-gray-600">Fill in the details to send your voucher</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Receiver Information */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Receiver Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Receiver's Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.receiverName}
                    onChange={(e) => handleInputChange('receiverName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter receiver's name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.mobileNumber}
                    onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+94XXXXXXXXXX"
                    maxLength={12} 
                  />

                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="receiver@example.com"
                  />
                </div>
              </div>
            </motion.div>

            {/* Delivery Timing */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">When to Send</h2>
              
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sendWhen"
                      value="now"
                      checked={formData.sendWhen === 'now'}
                      onChange={(e) => handleInputChange('sendWhen', e.target.value)}
                      className="mr-2"
                    />
                    <Send className="w-4 h-4 mr-2" />
                    Send Now
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sendWhen"
                      value="later"
                      checked={formData.sendWhen === 'later'}
                      onChange={(e) => handleInputChange('sendWhen', e.target.value)}
                      className="mr-2"
                    />
                    <Clock className="w-4 h-4 mr-2" />
                    Schedule for Later
                  </label>
                </div>

                {formData.sendWhen === 'later' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Date
                      </label>
                      <input
                        type="date"
                        value={formData.scheduleDate}
                        onChange={(e) => handleInputChange('scheduleDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Clock className="w-4 h-4 inline mr-1" />
                        Time
                      </label>
                      <input
                        type="time"
                        value={formData.scheduleTime}
                        onChange={(e) => handleInputChange('scheduleTime', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Occasion and Message */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                <Gift className="w-5 h-5 inline mr-2" />
                Occasion & Message
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Occasion
                  </label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => handleInputChange('occasion', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {occasions.map(occasion => (
                      <option key={occasion.value} value={occasion.value}>
                        {occasion.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Message
                  </label>
                  <textarea
                    value={formData.customMessage}
                    onChange={(e) => handleInputChange('customMessage', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your custom message"
                  />
                </div>
              </div>
            </motion.div>

            {/* Voucher Configuration */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Voucher Configuration</h2>
              
              <div className="space-y-6">
                {/* Amount Selection */}
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Amount
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {amountOptions.map(amount => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handleAmountChange(amount)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          formData.voucherAmount === amount
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        Rs. {amount.toLocaleString()}
                      </button>
                    ))}
                
                  </div>
                </div> */}

                {/* Amount Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Amount
                    </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {amountOptions.map(amount => (
                <button
                key={amount}
                type="button"
                onClick={() => handleAmountChange(amount)}
                className={`p-3 rounded-lg border-2 transition-all ${
                formData.voucherAmount === amount
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                >
                Rs. {amount.toLocaleString()}
                </button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <div className="mt-4">
              <input
                type="number"
                min="1"
                value={
                    amountOptions.includes(formData.voucherAmount)
                    ? ''
                    : formData.voucherAmount
                }
                onChange={(e) => {
                  const val = parseInt(e.target.value) ;
                  handleAmountChange(val);
                }}
                placeholder="Enter custom amount"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              </div>
            </div>


                {/* Quantity Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(-1)}
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    
                    <span className="text-xl font-semibold w-12 text-center">
                      {formData.quantity}
                    </span>
                    
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(1)}
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Total Amount */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Total Amount:</span>
                    <span className="text-2xl font-bold text-gray-900">
                      Rs. {(formData.voucherAmount * formData.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <button
                type="submit"
                className="w-full max-w-md bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Create Vouchers
              </button>
            </motion.div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AllocationForm;