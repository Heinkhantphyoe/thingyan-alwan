import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { supabase } from '../lib/supabaseClient';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('songs')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;
        setSongs(data || []);
      } catch (err) {
        console.error('Error fetching songs:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const currentTrack = songs[currentTrackIndex] || null;

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const nextTrack = useCallback(() => {
    if (songs.length === 0) return;
    setCurrentTrackIndex(prev => (prev + 1) % songs.length);
    setIsPlaying(true);
  }, [songs.length]);

  const prevTrack = useCallback(() => {
    if (songs.length === 0) return;
    setCurrentTrackIndex(prev => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  }, [songs.length]);

  const selectTrack = useCallback((index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  }, []);

  const value = {
    songs,
    currentTrack,
    currentTrackIndex,
    isPlaying,
    progress,
    loading,
    error,
    togglePlay,
    nextTrack,
    prevTrack,
    selectTrack,
    setIsPlaying,
    setProgress
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayerContext must be used within a PlayerProvider');
  }
  return context;
};
