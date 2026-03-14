import { useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { usePlayer } from '../hooks/usePlayer';

const AudioPlayer = () => {
  const playerRef = useRef(null);
  const { 
    currentTrack, 
    isPlaying, 
    setIsPlaying,
    progress, 
    loading, 
    error, 
    nextTrack, 
    prevTrack, 
    setProgress
  } = usePlayer();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.play().catch(err => {
          console.error('Play error:', err);
          setIsPlaying(false);
        });
      } else {
        playerRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width);
    
    if (playerRef.current) {
      const duration = playerRef.current.duration || currentTrack.duration || 0;
      playerRef.current.currentTime = percentage * duration;
    }
    setProgress(percentage * 100);
  };

  if (loading || error || !currentTrack) return null;

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Visual UI - only shown on Home Page */}
      {isHome && (
        <div className="fixed bottom-20 md:bottom-8 left-4 right-4 z-[60]">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/70 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-3xl p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-8 overflow-hidden animate-slide-up">
              {/* Track Info */}
              <div className="flex items-center gap-4 w-full md:w-1/3">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
                  <img 
                    src={currentTrack.cover_url || 'https://images.unsplash.com/photo-1459749411177-042180ce673c?w=200&h=200&fit=crop'} 
                    alt={currentTrack.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-gray-900 truncate">{currentTrack.title}</h2>
                  <p className="text-gray-500 text-sm truncate uppercase tracking-wider font-semibold">{currentTrack.artist}</p>
                </div>
              </div>

              {/* Controls & Progress */}
              <div className="flex flex-col items-center gap-2 w-full md:w-2/3">
                <div className="flex items-center gap-6">
                  <button 
                    onClick={prevTrack}
                    className="text-gray-700 hover:text-water-blue transition-colors"
                  >
                    <SkipBack size={24} />
                  </button>
                  <button 
                    onClick={togglePlay}
                    className="w-12 h-12 bg-water-blue text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-400 transition-all hover:scale-105 active:scale-95"
                  >
                    {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-0.5" />}
                  </button>
                  <button 
                    onClick={nextTrack}
                    className="text-gray-700 hover:text-water-blue transition-colors"
                  >
                    <SkipForward size={24} />
                  </button>
                </div>

                {/* Progress Bar Container */}
                <div className="w-full flex items-center gap-3">
                  <span className="text-[10px] text-gray-500 font-mono w-10 text-right">
                    {formatTime(playerRef.current?.currentTime || 0)}
                  </span>
                  <div 
                    className="h-1.5 flex-1 bg-gray-200 rounded-full cursor-pointer relative overflow-hidden group"
                    onClick={handleSeek}
                  >
                    <div 
                      className="absolute top-0 left-0 h-full bg-water-blue transition-all duration-300 group-hover:bg-blue-400" 
                      style={{ width: `${progress}%` }} 
                    />
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono w-10">
                    {formatTime(playerRef.current?.duration || currentTrack.duration || 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Audio Element - always present to keep music playing in background */}
      <audio
        ref={playerRef}
        src={currentTrack.audio_url}
        onTimeUpdate={(e) => {
          const currentTime = e.currentTarget.currentTime;
          const duration = e.currentTarget.duration || currentTrack.duration || 1;
          setProgress((currentTime / duration) * 100);
        }}
        onEnded={nextTrack}
        onError={(e) => console.error('Audio Element Error:', e)}
      />
    </>
  );
};

export default AudioPlayer;
