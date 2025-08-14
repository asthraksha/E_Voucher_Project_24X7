import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Calendar } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VoucherCard from '../components/VoucherCard';
// import InfoCard from '../components/InfoCard';
import VerificationModal from '../components/VerificationModal';

const HomePage = () => {
  const navigate = useNavigate();
  const [voucherData, setVoucherData] = useState(null);
  const [showVerification, setShowVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchVoucherData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setVoucherData({
        amount: 10000,
        currency: 'Rs',
        recipientName: 'John Doe',
        expiryDate: '31-08-2025'
      });
      setIsLoading(false);
    };

    fetchVoucherData();
  }, []);

  const handleAllocate = () => {
    setShowVerification(true);
  };

  const handleVerificationSuccess = () => {
    setShowVerification(false);
    navigate('/allocate');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Create Your Special E-Voucher!
            </h1>
            <p className="text-xl text-gray-600">
              Ready to share joy? Allocate your voucher to someone special!
            </p>
          </motion.div>

          {/* Voucher Card */}
          <div className="mb-12">
            <VoucherCard 
              amount={voucherData?.amount} 
              currency={voucherData?.currency}
            />
          </div>

          {/* Info Cards */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <InfoCard
              icon={User}
              title="Recipient"
              value={voucherData?.recipientName}
              delay={0.2}
            />
            <InfoCard
              icon={Calendar}
              title="Expires"
              value={voucherData?.expiryDate}
              delay={0.4}
            />
          </div> */}

          {/* Allocate Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-center"
          >
            
            <button
            onClick={handleAllocate}
            className="w-full max-w-md text-white py-4 px-8 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            style={{ backgroundColor: '#1C6DD0' }}
            >
            Allocate
            </button>

            <p className="mt-4 text-sm text-gray-600">
              Click above to start the allocation process and share this voucher with someone special
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />

      <VerificationModal
        isOpen={showVerification}
        onClose={() => setShowVerification(false)}
        onVerify={handleVerificationSuccess}
      />
    </div>
  );
};

export default HomePage;