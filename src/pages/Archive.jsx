import { motion } from 'framer-motion';
import MemoryWall from '../components/MemoryWall';

const Archive = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto p-6 pt-24 pb-32"
    >
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Memory Wall</h1>
        <p className="text-gray-600">A digital archive of Thingyan memories and stories.</p>
      </header>

      <MemoryWall />
    </motion.div>
  );
};

export default Archive;
