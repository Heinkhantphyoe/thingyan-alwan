import { motion } from 'framer-motion';
import { usePlayer } from '../hooks/usePlayer';
import SongListItem from '../components/SongListItem';

const Home = () => {
  const { songs, loading, error, currentTrackIndex, isPlaying, selectTrack, currentTrack } = usePlayer();

  if (loading) return (
    <div className="max-w-4xl mx-auto p-6 pt-24 pb-32">
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-white/5 h-20 rounded-xl" />
        ))}
      </div>
    </div>
  );

  if (error) return <div className="text-center py-32 text-red-500">Error: {error}</div>;

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image Layer */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/src/assets/bg_song.jpg')` }}
      />

      {/* Dark/Blur Overlay*/}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 pt-24"
      >
        <div className="max-w-4xl mx-auto p-6">
          <header className="mb-8 pl-4">
            <h1 className="text-3xl font-extrabold text-black mb-1 font-heading">Featured Songs</h1>
            <p className="text-gray-600 font-semibold">Select a track to play</p>
          </header>

          <div className="space-y-1">
            {songs.map((song, index) => (
              <SongListItem
                key={song.id}
                song={song}
                isActive={currentTrackIndex === index}
                isPlaying={isPlaying}
                onClick={() => selectTrack(index)}
              />
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default Home;
