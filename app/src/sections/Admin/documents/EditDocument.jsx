import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../../hooks/themeContext';

export default function EditDocument() {
  const { isWarmthMode } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/documents')
      .then(res => res.json())
      .then(data => {
        const doc = (data.documents || []).find(d => String(d.id) === id);
        if (!doc) { setError('Document not found'); return; }
        setForm({
          title: doc.title || '',
          desc: doc.desc || '',
          last_updated: doc.last_updated_raw || '',
          file_path: doc.file_path || '',
        });
      })
      .catch(err => setError(err.message));
  }, [id]);

  const handleFileChange = async (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
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
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/documents/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to update document');
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

  if (error && !form) {
    return (
      <div className={`max-w-2xl mx-auto p-6 rounded-2xl border-2 ${cardClass}`}>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className={`w-12 h-12 rounded-full border-4 border-t-transparent animate-spin
          ${isWarmthMode ? "border-[#E94E41]" : "border-cyan-400"}`} />
        <p className={`font-mono tracking-widest uppercase text-sm
          ${isWarmthMode ? "text-[#8B2D2D]" : "text-cyan-200"}`}>Loading...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`max-w-2xl mx-auto p-8 rounded-2xl backdrop-blur-md border-2 shadow-2xl ${cardClass}`}
    >
      <h1 className={`text-3xl font-bold mb-6 ${isWarmthMode ? 'text-pink-700' : 'text-cyan-300'}`}>
        Edit Document
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
          {form.file_path && (
            <p className="text-xs opacity-70 mb-2">
              Current: <a href={form.file_path} target="_blank" rel="noreferrer" className="underline">view</a>
              {' '}— upload a new file to replace it
            </p>
          )}
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            disabled={uploading}
            className={inputClass}
          />
          {uploading && <p className="text-xs opacity-70 mt-1">Uploading...</p>}
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
            {saving ? 'Saving...' : 'Save changes'}
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