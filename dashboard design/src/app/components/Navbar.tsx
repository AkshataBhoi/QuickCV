import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
              <FileText size={24} />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">QuickCV</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">How it works</a>
            <a href="#templates" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Templates</a>
            <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Pricing</a>
            <button className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all cursor-pointer">
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 flex flex-col gap-4"
        >
          <a href="#how-it-works" className="text-gray-600 font-medium py-2">How it works</a>
          <a href="#templates" className="text-gray-600 font-medium py-2">Templates</a>
          <a href="#pricing" className="text-gray-600 font-medium py-2">Pricing</a>
          <button className="bg-indigo-600 text-white w-full py-3 rounded-xl font-semibold">Sign In</button>
        </motion.div>
      )}
    </nav>
  );
};
