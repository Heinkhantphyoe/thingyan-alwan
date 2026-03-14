import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../hooks/useAuth';
import { User, Mail, Camera, Loader2, Save, CheckCircle, AlertCircle, LogOut, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
  const { user, signOut } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setFullName(user.user_metadata?.full_name || '');
      setEmail(user.email || '');
      // Ensure we get the latest avatar URL
      setAvatarUrl(user.user_metadata?.avatar_url || '');
    }
  }, [user]);

  const handleAvatarUpload = async (e) => {
    try {
      setUploading(true);
      setError(null);

      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload to memory-images bucket
      const { error: uploadError } = await supabase.storage
        .from('memory-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('memory-images')
        .getPublicUrl(filePath);

      // Add a cache-busting timestamp to the URL to force re-render
      const finalUrl = `${publicUrl}?t=${Date.now()}`;
      setAvatarUrl(finalUrl);

      // Update metadata immediately with new avatar URL
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: finalUrl }
      });

      if (updateError) throw updateError;

      setMessage('Profile picture updated successfully!');
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      const { error: updateError } = await supabase.auth.updateUser({
        data: { full_name: fullName }
      });

      if (updateError) throw updateError;

      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-12 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/50"
        >
          <div className="w-20 h-20 bg-blue-50 text-water-blue rounded-3xl flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Protected Area</h2>
          <p className="text-gray-500 mb-8 max-w-xs mx-auto">Please log in to your account to view and manage your profile.</p>
          <a href="/login" className="inline-block px-8 py-4 bg-water-blue text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-400 hover:-translate-y-1 transition-all active:scale-95">
            Return to Login
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFF] pb-24 pt-12 px-4">
      {/* Decorative background elements */}
      <div className="fixed top-20 right-[10%] w-64 h-64 bg-blue-200/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="fixed bottom-20 left-[10%] w-96 h-96 bg-yellow-100/30 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          {/* Main Card */}
          <div className="bg-white/70 backdrop-blur-2xl rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] overflow-hidden border border-white p-1 sm:p-2">

            {/* Header / Banner */}
            <div className="relative h-48 sm:h-64 rounded-[2.5rem] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-water-blue via-blue-400 to-indigo-500"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <Zap size={200} className="text-white" strokeWidth={1} />
              </div>

              {/* Action Buttons (Sign Out) */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={signOut}
                className="absolute top-6 right-6 px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-white/30 transition-colors border border-white/20"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </motion.button>
            </div>

            {/* Profile Content */}
            <div className="px-6 sm:px-12 pb-12">
              <div className="relative -mt-20 mb-10 flex flex-col items-center sm:items-end sm:flex-row sm:gap-8">
                <div className="relative group">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="w-40 h-40 rounded-[2.5rem] border-8 border-white overflow-hidden bg-gray-50 shadow-2xl relative"
                  >
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                        onError={() => setAvatarUrl('')}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gradient-to-br from-gray-50 to-gray-100">
                        <User size={64} />
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera className="text-white" size={32} />
                    </div>
                  </motion.div>

                  <label className="absolute -bottom-2 -right-2 p-4 bg-white text-water-blue rounded-2xl shadow-xl cursor-pointer hover:bg-blue-50 transition-all active:scale-90 border border-gray-50">
                    {uploading ? <Loader2 size={24} className="animate-spin" /> : <Camera size={24} />}
                    <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} disabled={uploading} />
                  </label>
                </div>

                <div className="mt-6 sm:mb-4 text-center sm:text-left flex-grow">
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-2xl font-bold text-gray-900 tracking-tight"
                  >
                    {fullName || 'Your Name'}
                  </motion.h1>
                  <p className="text-base text-gray-500 font-medium">{email}</p>
                </div>
              </div>

              {/* Feedback Messages */}
              <AnimatePresence mode="wait">
                {message && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="mb-8 p-5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-3xl flex items-center gap-4"
                  >
                    <div className="w-10 h-10 bg-emerald-500 text-white rounded-2xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={24} />
                    </div>
                    <span className="font-bold text-base">{message}</span>
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="mb-8 p-5 bg-rose-50 border border-rose-100 text-rose-700 rounded-3xl flex items-center gap-4"
                  >
                    <div className="w-10 h-10 bg-rose-500 text-white rounded-2xl flex items-center justify-center flex-shrink-0">
                      <AlertCircle size={24} />
                    </div>
                    <span className="font-bold text-base">{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleUpdateProfile} className="grid grid-cols-1 gap-8">
                <div className="space-y-6">
                  <div className="group space-y-3">
                    <label className="text-sm font-bold text-gray-500 ml-1 uppercase tracking-wider flex items-center gap-2">
                      Personal Details
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-water-blue transition-colors">
                          <User size={20} />
                        </div>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Your full name"
                          className="w-full pl-14 pr-6 py-5 bg-gray-50/50 border border-transparent rounded-[1.5rem] focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-water-blue/20 text-gray-900 font-semibold text-base placeholder-gray-400 transition-all outline-none"
                        />
                      </div>

                      <div className="relative opacity-70">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                          <Mail size={20} />
                        </div>
                        <input
                          type="email"
                          value={email}
                          disabled
                          className="w-full pl-14 pr-6 py-5 bg-gray-100/50 border border-gray-100 rounded-[1.5rem] text-gray-500 font-semibold text-base cursor-not-allowed outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-3 text-gray-400 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100">
                    <ShieldCheck size={20} className="text-emerald-500" />
                    <span className="text-sm font-bold">Encrypted & Secure</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading || uploading}
                    className={`w-full sm:w-auto px-8 py-3 rounded-[1.5rem] font-bold text-lg text-white shadow-[0_12px_24px_-8px_rgba(59,130,246,0.5)] transition-all flex items-center justify-center gap-3 ${loading || uploading ? 'bg-gray-300 cursor-not-allowed shadow-none' : 'bg-water-blue hover:bg-blue-400'}`}
                  >
                    {loading ? <Loader2 size={24} className="animate-spin" /> : <Save size={24} />}
                    Update Profile
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
