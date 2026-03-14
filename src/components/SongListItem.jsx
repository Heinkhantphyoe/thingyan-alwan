import React from 'react';
import { motion } from 'framer-motion';

const SongListItem = ({ song, isActive, isPlaying, onClick }) => {
  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
      className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 group ${isActive ? 'bg-water-blue/10' : ''}`}
      onClick={onClick}
    >
      <div className="w-16 h-16 relative flex-shrink-0 rounded-lg overflow-hidden shadow-md">
        <img
          src={song.cover_url || 'https://images.unsplash.com/photo-1459749411177-042180ce673c?w=200&h=200&fit=crop'}
          alt={song.title}
          className="w-full h-full object-cover"
        />
        {isActive && isPlaying && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="flex gap-1 items-end h-4">
              <div className="w-1 bg-white animate-[pulse_1s_infinite] h-full" />
              <div className="w-1 bg-white animate-[pulse_1.2s_infinite] h-[60%]" />
              <div className="w-1 bg-white animate-[pulse_0.8s_infinite] h-[80%]" />
            </div>
          </div>
        )}
      </div>

      <div className="flex-1">
        <h3 className={`font-bold text-lg ${isActive ? 'text-water-blue' : 'text-black'}`}>
          {song.title}
        </h3>
        <p className="text-gray-600 text-sm mt-0.5 uppercase tracking-wider font-bold">
          {song.artist}
        </p>
      </div>

      {isActive && (
        <div className="flex items-center gap-3 pr-2">
          <div className="w-2 h-2 rounded-full bg-water-blue animate-pulse" />
        </div>
      )}
    </motion.div>
  );
};

export default SongListItem;
