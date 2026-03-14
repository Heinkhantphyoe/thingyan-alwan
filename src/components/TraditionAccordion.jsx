import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TraditionAccordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div 
          key={index} 
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-soft-bg flex items-center justify-center font-bold text-water-blue border border-blue-50">
                {index + 1}
              </span>
              <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
            </div>
            {openIndex === index ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
          </button>
          
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="p-6 pt-0 border-t border-gray-50 text-gray-600 leading-relaxed">
                  {item.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default TraditionAccordion;
