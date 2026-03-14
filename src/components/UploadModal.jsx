import React, { useState } from 'react';
import { X, Upload, Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../hooks/useAuth';

const UploadModal = ({ isOpen, onClose, onUploadSuccess }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState(user?.user_metadata?.full_name || '');
  const [story, setStory] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title || !story || !author || !user) {
      setError('Please fill in all fields (Title, Name, Story) and ensure you are logged in.');
      return;
    }

    try {
      setUploading(true);
      setError(null);
      
      // 1. Upload image to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;
      const filePath = `memories/${fileName}`;

      const { error: uploadError } = await supabase.storage
          .from('memory-images')
          .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get public URL
      const { data: { publicUrl } } = supabase.storage
          .from('memory-images')
          .getPublicUrl(filePath);

      // 3. Save to Database with user_id to satisfy RLS
      const { error: dbError } = await supabase
          .from('memories')
          .insert([{
            title,
            author,
            story,
            image_url: publicUrl,
            user_id: user.id,
            created_at: new Date().toISOString()
          }]);

      if (dbError) throw dbError;

      onUploadSuccess();
      onClose();
      // Reset form
      setTitle('');
      setStory('');
      setFile(null);
      setPreview(null);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'An unexpected error occurred during upload.');
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <form onSubmit={handleSubmit} className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Share a Memory</h2>
          
          <div className="space-y-6">
            {/* Error Box */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                <div className="text-sm font-medium">{error}</div>
              </div>
            )}

            {/* Image Upload Area */}
            <div className={`relative h-48 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-colors ${preview ? 'border-water-blue' : 'border-gray-200 hover:border-gray-300'}`}>
              {preview ? (
                <>
                  <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
                  <button 
                    type="button"
                    onClick={() => { setFile(null); setPreview(null); }}
                    className="absolute top-2 right-2 p-1 bg-white/80 rounded-full shadow-sm text-red-500 hover:text-red-600"
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <label className="cursor-pointer flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-blue-50 text-water-blue rounded-full flex items-center justify-center">
                    <ImageIcon size={24} />
                  </div>
                  <span className="text-sm text-gray-500 font-medium">Click to upload photo</span>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
              )}
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title of your memory"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-water-blue text-gray-900 font-medium placeholder-gray-400"
                required
              />
              <input
                type="text"
                placeholder="Your Name (Author)"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-water-blue text-gray-900 font-medium placeholder-gray-400"
                required
              />
              <textarea
                placeholder="Tell your story..."
                value={story}
                onChange={(e) => setStory(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-water-blue text-gray-900 font-medium placeholder-gray-400 min-h-[120px] resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={uploading || !file}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${uploading || !file ? 'bg-gray-300 cursor-not-allowed' : 'bg-water-blue hover:bg-blue-400 active:scale-95'}`}
            >
              {uploading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Sharing...
                </>
              ) : (
                <>
                  <Upload size={20} />
                  Share Memory
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
