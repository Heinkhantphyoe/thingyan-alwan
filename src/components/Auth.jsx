import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Mail, LogIn, Loader2, UserPlus, ShieldCheck, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage('');
      setError('');
      
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({ 
          email, 
          password 
        });
        if (error) throw error;
        
        if (data?.session) {
          // If session is created, sign them out to force login
          await supabase.auth.signOut();
          setMessage('Account created! Please sign in with your new credentials.');
          setIsSignUp(false);
          setPassword('');
        } else {
          setMessage('Check your email for a confirmation link to complete signup.');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ 
          email, 
          password 
        });
        if (error) throw error;
        navigate('/');
      }
    } catch (error) {
      setError(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      {/* Decorative background elements */}
      <div className="fixed top-20 left-[10%] w-64 h-64 bg-blue-100/30 rounded-full blur-3xl -z-10"></div>
      <div className="fixed bottom-20 right-[10%] w-80 h-80 bg-water-blue/10 rounded-full blur-3xl -z-10"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-water-blue to-blue-400"></div>

          <div className="mb-10 text-center">
            <div className="w-20 h-20 bg-blue-50 text-water-blue rounded-3xl flex items-center justify-center mx-auto mb-6">
              <ShieldCheck size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-gray-500 font-medium text-sm">
              {isSignUp ? 'Join organized memories' : 'Sign in to access your profile'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {message && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-5 bg-emerald-50 text-emerald-700 rounded-2xl mb-8 flex items-center gap-3 border border-emerald-100"
              >
                <div className="w-8 h-8 bg-emerald-500 text-white rounded-xl flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={18} />
                </div>
                <span className="font-bold">{message}</span>
              </motion.div>
            )}

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-5 bg-rose-50 text-rose-700 rounded-2xl mb-8 flex items-center gap-3 border border-rose-100"
              >
                <div className="w-8 h-8 bg-rose-500 text-white rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertCircle size={18} />
                </div>
                <span className="font-bold">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleAuth} className="space-y-5">
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-water-blue transition-colors">
                <Mail size={20} />
              </div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-gray-50/50 border border-transparent rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-water-blue/20 text-gray-900 font-semibold text-base placeholder-gray-400 transition-all outline-none"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-water-blue transition-colors">
                <LogIn size={20} />
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-gray-50/50 border border-transparent rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-water-blue/20 text-gray-900 font-semibold text-base placeholder-gray-400 transition-all outline-none"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-2xl font-bold text-lg text-white shadow-[0_12px_24px_-8px_rgba(59,130,246,0.3)] transition-all flex items-center justify-center gap-3 ${loading ? 'bg-gray-300 cursor-not-allowed shadow-none' : 'bg-water-blue hover:bg-blue-400'}`}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                isSignUp ? <UserPlus size={24} /> : <LogIn size={24} />
              )}
              {isSignUp ? 'Create Account' : 'Sign In'}
            </motion.button>
            
            <div className="text-center pt-6">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setMessage('');
                }}
                className="text-base font-semibold text-water-blue hover:underline decoration-2 underline-offset-4"
              >
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Create one"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
