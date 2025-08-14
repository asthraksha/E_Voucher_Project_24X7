import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Settings, Eye, Download, Share } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const VoucherDisplay = () => {
  const navigate = useNavigate();
  const [vouchers, setVouchers] = useState([]);
  const [allocationData, setAllocationData] = useState(null);

  useEffect(() => {
    // Get allocation data from localStorage
    const storedData = localStorage.getItem('allocationData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setAllocationData(data);
      
      // Generate vouchers based on quantity
      const generatedVouchers = Array.from({ length: data.quantity }, (_, index) => ({
        id: `voucher-${index + 1}`,
        amount: data.voucherAmount,
        currency: 'Rs',
        recipientName: data.receiverName,
        message: data.customMessage,
        occasion: data.occasion,
        theme: 'default',
        backgroundColor: '#1e293b',
        textColor: '#ffffff',
        accentColor: '#fbbf24'
      }));
      
      setVouchers(generatedVouchers);
    }
  }, []);

  const handleCustomize = (voucherId) => {
    navigate(`/customize/${voucherId}`);
  };

  const handlePreview = (voucher) => {
    // Handle voucher preview
    console.log('Preview voucher:', voucher);
  };

  const handleDownload = (voucher) => {
    // Handle voucher download
    console.log('Download voucher:', voucher);
  };

  const handleShare = (voucher) => {
    // Handle voucher sharing
    console.log('Share voucher:', voucher);
  };

  if (!allocationData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">No allocation data found</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Vouchers</h1>
            <p className="text-gray-600">
              {vouchers.length} voucher{vouchers.length > 1 ? 's' : ''} created for {allocationData.receiverName}
            </p>
          </motion.div>

          {/* Vouchers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vouchers.map((voucher, index) => (
              <motion.div
                key={voucher.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Voucher Preview */}
                <div 
                  className="aspect-video p-6 text-white relative overflow-hidden"
                  style={{ backgroundColor: voucher.backgroundColor }}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="h-full w-full bg-gradient-to-br from-yellow-400 to-orange-500"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">
                        {voucher.currency}.{voucher.amount?.toLocaleString()}
                      </h3>
                      <p className="text-xs opacity-75 uppercase tracking-wider">
                        Gift Voucher
                      </p>
                    </div>
                    
                    <div>
                    <p className="text-xs opacity-75 mt-1 line-clamp-2">
                        {voucher.message}
                      </p>
                      <p className="text-sm opacity-90">
                        To: {voucher.recipientName}
                      </p>
                      <p className="text-[10px] opacity-70">
                      Powered by 24x7 Retail Software Solutions
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {/* <button
                      onClick={() => handlePreview(voucher)}
                      className="flex items-center justify-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Preview</span>
                    </button>
                    
                    <button
                      onClick={() => handleDownload(voucher)}
                      className="flex items-center justify-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button> */}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleCustomize(voucher.id)}
                      className="flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Customize</span>
                    </button>
                    
                    <button
                      onClick={() => handleShare(voucher)}
                      className="flex items-center justify-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      <Share className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{vouchers.length}</p>
                <p className="text-sm text-gray-600">Vouchers Created</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  Rs. {(allocationData.voucherAmount * allocationData.quantity).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Total Value</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {allocationData.sendWhen === 'now' ? 'Immediate' : 'Scheduled'}
                </p>
                <p className="text-sm text-gray-600">Delivery</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VoucherDisplay;