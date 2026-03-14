import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useMemories = () => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMemories = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('memories')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMemories(data || []);
    } catch (err) {
      console.error('Error fetching memories:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMemories();

    // Set up real-time subscription
    const subscription = supabase
      .channel('memories_changes')
      .on('postgres_changes', { event: '*', table: 'memories' }, () => {
        fetchMemories();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [fetchMemories]);

  const uploadMemory = async (memory) => {
    try {
      const { data, error } = await supabase
        .from('memories')
        .insert([memory])
        .select();

      if (error) throw error;
      return data[0];
    } catch (err) {
      console.error('Error uploading memory:', err);
      throw err;
    }
  };

  return {
    memories,
    loading,
    error,
    uploadMemory,
    refreshMemories: fetchMemories
  };
};
