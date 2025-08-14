import React from 'react';
import { motion } from 'framer-motion';

const InfoCard = ({ icon: Icon, title, value, delay = 0 }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Icon className="w-4 h-4 text-blue-600" />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
          <p className="text-lg font-semibold text-gray-600">{value}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default InfoCard;