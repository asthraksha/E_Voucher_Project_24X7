import React from 'react';
import { motion } from 'framer-motion';

const VoucherCard = ({ amount, currency = "Rs" }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-8 shadow-2xl"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-gradient-to-br from-yellow-400 to-orange-500"></div>
      </div>

      {/* Golden Bow */}
      <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
        <div className="relative w-full h-full">
          <div className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full transform rotate-45"></div>
          <div className="absolute top-6 right-6 w-20 h-20 border-4 border-yellow-400 rounded-full transform rotate-12"></div>
          <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-lg transform rotate-45 opacity-80"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="text-white">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="text-6xl font-bold mb-2">
              {currency}.{amount?.toLocaleString() || '10,000'}
            </h3>
            <p className="text-sm text-gray-300 uppercase tracking-widest">
              AVAILABLE BALANCE
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default VoucherCard;