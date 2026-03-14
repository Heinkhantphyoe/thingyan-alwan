import React, { useState } from 'react';
import { Plus, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMemories } from '../hooks/useMemories';
import { useAuth } from '../hooks/useAuth';
import MemoryCard from './MemoryCard';
import UploadModal from './UploadModal';

const MemoryWall = () => {
  const { memories, loading, error, refreshMemories } = useMemories();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShareClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setIsModalOpen(true);
  };

  if (loading && memories.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-gray-100 rounded-2xl h-80" />
        ))}
      </div>
    );
  }

  if (error) return <div className="text-center py-20 text-red-500">Error loading memories: {error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Community Stories</h2>
          <p className="text-gray-500">Shared moments from the Water Festival</p>
        </div>
        <button
          onClick={handleShareClick}
          className="flex items-center gap-2 bg-water-blue text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-blue-400 transition-all hover:scale-105 active:scale-95"
        >
          {user ? <Plus size={20} /> : <Lock size={18} />}
          <span>Share Yours</span>
        </button>
      </div>

      {memories.length === 0 ? (
        <div className="text-center py-32 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-medium">No memories shared yet. Be the first to share one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {memories.map((memory) => (
            <MemoryCard key={memory.id} memory={memory} />
          ))}
        </div>
      )}

      <UploadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onUploadSuccess={refreshMemories}
      />
    </div>
  );
};

export default MemoryWall;
