import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/themeContext';

export default function NewDocument() {
  const { isWarmthMode } = useTheme();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    desc: '',
    last_updated: '',
    file_path: '',
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Upload the file when selected, then store the returned URL in form.file_path
  const handleFileChange = async (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selected);

    try {
      const res = await fetch('/api/admin/documents/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Upload failed');
      }
      const { url } = await res.json();
      setForm(prev => ({ ...prev, file_path: url }));
    } catch (err) {
      setError(`Upload failed: ${err.message}`);
      setFile(null);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.file_path) {
      setError('Please upload a file first.');
      return;
    }
    setSaving(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to create document');
      }
      navigate('/Admin/Documents');
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  const cardClass = isWarmthMode
    ? 'bg-white/80 border-pink-200 text-gray-800'
    : 'bg-[#0a0e27]/60 border-cyan-500/50 text-white';

  const inputClass = `w-full border rounded-lg px-3 py-2 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 ${
    isWarmthMode ? 'border-gray-300 focus:ring-purple-400' : 'border-cyan-700 focus:ring-cyan-400'
  }`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`max-w-2xl mx-auto p-8 rounded-2xl backdrop-blur-md border-2 shadow-2xl ${cardClass}`}
    >
      <h1 className={`text-3xl font-bold mb-6 ${isWarmthMode ? 'text-pink-700' : 'text-cyan-300'}`}>
        New Document
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text" required maxLength={100}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            rows={3} maxLength={500}
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Last Updated <span className="text-red-500">*</span>
          </label>
          <input
            type="date" required
            value={form.last_updated}
            onChange={(e) => setForm({ ...form, last_updated: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            File <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            disabled={uploading}
            className={inputClass}
          />
          {uploading && <p className="text-xs opacity-70 mt-1">Uploading...</p>}
          {form.file_path && !uploading && (
            <p className="text-xs text-green-600 mt-1">
              Uploaded: <a href={form.file_path} target="_blank" rel="noreferrer" className="underline">view</a>
            </p>
          )}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving || uploading || !form.file_path}
            className={`px-5 py-2 rounded-lg font-medium text-white disabled:opacity-50 ${
              isWarmthMode
                ? 'bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400'
                : 'bg-gradient-to-r from-cyan-500 to-blue-500'
            }`}
          >
            {saving ? 'Saving...' : 'Create document'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/Admin/Documents')}
            className={`px-5 py-2 rounded-lg font-medium ${
              isWarmthMode ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-cyan-900/40 text-cyan-300 hover:bg-cyan-900/60'
            }`}
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
}