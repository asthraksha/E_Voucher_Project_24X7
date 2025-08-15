import React from 'react';
import { Youtube, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import logo from '../assests/LOGO.png'


const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-8">
          {/* Logo */}
          <div className="flex items-center">
          <img
              src= {logo}
              alt="Company Logo"
              className="h-10 w-auto"
            />
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-400 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Powered by */}
        <div className="border-t border-gray-200 pt-4 pb-4">
          <p className="text-center text-sm text-gray-500">
            Powered by 24x7 Retail Software Solutions
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;