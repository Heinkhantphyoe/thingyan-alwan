import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const PadaukRain = () => {
  const petals = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 15,
      size: 15 + Math.random() * 15,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{ top: '-10%', opacity: 0, rotate: 0 }}
          animate={{
            top: '110%',
            opacity: [0, 1, 1, 0],
            rotate: 360,
            x: [0, 20, -20, 0],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear"
          }}
          className="absolute"
          style={{ left: petal.left }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Simple Flower shape for Padauk */}
            <path
              d="M12 2C10.5 5 8 5 8 7C8 9 9.5 10 11 10C9.5 10 8 11 8 13C8 15 10.5 15 12 18C13.5 15 16 15 16 13C16 11 14.5 10 13 10C14.5 10 16 9 16 7C16 5 13.5 5 12 2Z"
              fill="#FFD54F"
              opacity="0.6"
            />
            <circle cx="12" cy="9.5" r="1.5" fill="#FBC02D" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default PadaukRain;
