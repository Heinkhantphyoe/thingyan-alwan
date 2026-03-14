import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, X } from 'lucide-react';

const MemoryCard = ({ memory }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        onClick={() => setIsOpen(true)}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-all group"
      >
        <div className="aspect-square overflow-hidden relative">
          <img
            src={memory.image_url}
            alt={memory.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-sm font-medium bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">Read Story</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-gray-900 truncate mb-1">{memory.title}</h3>
          <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">{memory.story}</p>
          <div className="flex items-center justify-between text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>{new Date(memory.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <User size={12} />
              <span>{memory.author}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Full Story Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white text-gray-900 rounded-full shadow-md z-10 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="overflow-y-auto">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={memory.image_url}
                    alt={memory.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-bold uppercase tracking-widest mb-4">
                    <div className="flex items-center gap-2 text-water-blue">
                      <Calendar size={14} />
                      <span>{new Date(memory.created_at).toLocaleDateString()}</span>
                    </div>
                    {memory.author && (
                      <div className="flex items-center gap-2 text-gray-400">
                        <User size={14} />
                        <span>{memory.author}</span>
                      </div>
                    )}
                  </div>
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-6">{memory.title}</h2>
                  <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                    {memory.story}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MemoryCard;
