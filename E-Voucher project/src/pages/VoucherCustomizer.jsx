import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Palette, Image, Type, Save, RotateCcw, Music } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import image1 from '../assests/Birthday1.jpg'
import image2 from '../assests/Valentine1.jpg'
import image3 from '../assests/Wedding1.jpg'
import image4 from '../assests/Christmas1.jpg'
import image5 from '../assests/Christmas2.jpg'


const themes = [
  { id: 'elegant', name: 'Elegant', bg: '#1e293b', text: '#ffffff'},
  { id: 'modern', name: 'Modern', bg: '#0f172a', text: '#f8fafc' },
  { id: 'warm', name: 'Warm', bg: '#7c2d12', text: '#fef7cd' },
  { id: 'fresh', name: 'Fresh', bg: '#064e3b', text: '#ecfdf5' },
  { id: 'royal', name: 'Royal', bg: '#581c87', text: '#faf5ff' },
  { id: 'sunset', name: 'Sunset', bg: '#c2410c', text: '#fff7ed' }
];

const backgroundImages = [
  image1, image2, image3, image4, image5,
];

const VoucherCustomizer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [voucher, setVoucher] = useState(null);
  const [customization, setCustomization] = useState({
    theme: 'elegant',
    backgroundColor: '#1e293b',
    textColor: '#ffffff',
    backgroundImage: null,
    message: '',
    fontSize: 'medium'
  });
  const [activeTab, setActiveTab] = useState('theme');
  const [allocationData, setAllocationData] = useState(null);

  useEffect(() => {
    // Get allocation data and voucher info
    const storedData = localStorage.getItem('allocationData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setAllocationData(data);
      
      // Set initial voucher data
      setVoucher({
        id,
        amount: data.voucherAmount,
        currency: 'Rs',
        recipientName: data.receiverName,
        message: data.customMessage,
        occasion: data.occasion
      });
      
      setCustomization(prev => ({
        ...prev,
        message: data.customMessage
      }));
    }
  }, [id]);

  const handleThemeChange = (theme) => {
    setCustomization(prev => ({
      ...prev,
      theme: theme.id,
      backgroundColor: theme.bg,
      textColor: theme.text,
      backgroundImage: null
    }));
  };

  const handleColorChange = (field, color) => {
    setCustomization(prev => ({
      ...prev,
      [field]: color
    }));
  };

  const handleImageChange = (imageUrl) => {
    setCustomization(prev => ({
      ...prev,
      backgroundImage: imageUrl
    }));
  };

  const handleMessageChange = (message) => {
    setCustomization(prev => ({
      ...prev,
      message
    }));
  };

  const handleReset = () => {
    const elegantTheme = themes.find(t => t.id === 'elegant');
    setCustomization({
      theme: 'elegant',
      backgroundColor: elegantTheme.bg,
      textColor: elegantTheme.text,
      backgroundImage: null,
      message: allocationData?.customMessage || '',
      fontSize: 'medium'
    });
  };

  const handleSave = () => {
    // Save customization (in a real app, this would call an API)
    console.log('Saving customization:', customization);
    navigate('/vouchers');
  };

  if (!voucher || !allocationData) {
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

  const voucherStyle = {
    backgroundColor: customization.backgroundImage ? 'transparent' : customization.backgroundColor,
    color: customization.textColor,
    backgroundImage: customization.backgroundImage ? `url(${customization.backgroundImage})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Customize Voucher</h1>
            <p className="text-gray-600">Personalize your voucher design</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Voucher Preview */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Preview</h2>
                
                <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                  <div 
                    className="h-full w-full p-8 text-white relative overflow-hidden"
                    style={voucherStyle}
                  >
                    {/* Overlay for better text readability on background images */}
                    {customization.backgroundImage && (
                      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    )}

                    {/* Background Pattern */}
                    {!customization.backgroundImage && (
                      <div className="absolute inset-0 opacity-10">
                        <div className="h-full w-full bg-gradient-to-br from-yellow-400 to-orange-500"></div>
                      </div>
                    )}

                    

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                    <h3 className="text-4xl font-bold mb-2" style={{ color: customization.textColor }}>
                    {voucher.currency}.{voucher.amount?.toLocaleString()}
                    </h3>
                    <p className="text-sm opacity-75 uppercase tracking-wider">
                    Gift Voucher
                    </p>
                    </div>

                    <div className="mt-1">
                    <p className="text-xl font-semibold opacity-90 leading-relaxed mb-2">
                    {customization.message}
                    </p>
                    <p className="text-lg font-medium mb-8" style={{ color: customization.textColor }}>
                    For: {voucher.recipientName}
                    </p>
                    <p className="text-[10px] opacity-70" style={{ color: customization.textColor }}>
                    Powered by 24x7 Retail Software Solutions
                    </p>
                    </div>
                  </div>

                  </div>
                </div>
              </motion.div>
            </div>

            {/* Customization Panel */}
            <div> 
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-white rounded-xl shadow-lg p-2"
              >
                {/* Tabs */}
                <div className="grid grid-cols-4  flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
                  {[
                    { id: 'theme', label: 'Theme', icon: Palette },
                    { id: 'image', label: 'Image', icon: Image },
                    { id: 'message', label: 'Message', icon: Type },
                    { id: 'music', label: 'Music', icon: Music }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <tab.icon className="w-5 h-5 mb-1" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="space-y-6">
                  {activeTab === 'theme' && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-4">Choose Theme</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {themes.map(theme => (
                          <button
                            key={theme.id}
                            onClick={() => handleThemeChange(theme)}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              customization.theme === theme.id
                                ? 'border-blue-500 shadow-md'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div 
                              className="w-full h-12 rounded mb-2"
                              style={{ backgroundColor: theme.bg }}
                            ></div>
                            <p className="text-sm font-medium">{theme.name}</p>
                          </button>
                        ))}
                      </div>

                      <div className="mt-6">
                        <h4 className="font-medium text-gray-900 mb-3">Custom Colors</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Background</label>
                            <input
                              type="color"
                              value={customization.backgroundColor}
                              onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                              className="w-full h-10 rounded border border-gray-300"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Text</label>
                            <input
                              type="color"
                              value={customization.textColor}
                              onChange={(e) => handleColorChange('textColor', e.target.value)}
                              className="w-full h-10 rounded border border-gray-300"
                            />
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'image' && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-4">Background Image</h3>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <button
                          onClick={() => handleImageChange(null)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            !customization.backgroundImage
                              ? 'border-blue-500 shadow-md'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="w-full h-16 bg-gray-100 rounded mb-2 flex items-center justify-center">
                            <span className="text-xs text-gray-500">No Image</span>
                          </div>
                        </button>
                        {backgroundImages.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => handleImageChange(image)}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              customization.backgroundImage === image
                                ? 'border-blue-500 shadow-md'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div 
                              className="w-full h-16 rounded mb-2 bg-cover bg-center"
                              style={{ backgroundImage: `url(${image})` }}
                            ></div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'message' && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-4">Custom Message</h3>
                      <textarea
                        value={customization.message}
                        onChange={(e) => handleMessageChange(e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your custom message..."
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {customization.message.length}/200 characters
                      </p>
                    </div>
                  )}
                  {activeTab === 'music' && (
                  <div>
                      <h3 className="font-medium text-gray-900 mb-4">Add Music</h3>
                        <p className="text-sm text-gray-600 mb-3">
                        Choose a background music track to accompany your voucher.
                        </p>
                      <div className="space-y-3">
                      <button className="w-full py-2 px-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                      Upload Music
                      </button>
                      <button className="w-full py-2 px-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                      Select from Library
                      </button>
                      </div>
                      </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleReset}
                    className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset</span>
                  </button>
                  
                  <button
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VoucherCustomizer;