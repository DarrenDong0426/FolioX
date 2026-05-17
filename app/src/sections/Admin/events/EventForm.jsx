import React, { useState } from 'react';
import { useTheme } from '../../../hooks/themeContext';

const TAG_OPTIONS = ['Personal', 'Professional', 'Projects', 'Research'];

export default function EventForm({ initialForm, onSubmit, submitLabel, onCancel, error, saving }) {
  const { isWarmthMode } = useTheme();

  const [form, setForm] = useState(initialForm);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    setUploadError(null);

    try {
      const newUrls = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/admin/events/upload-image', {
          method: 'POST',
          credentials: 'include',
          body: formData,
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || 'Upload failed');
        }
        const { url } = await res.json();
        newUrls.push(url);
      }
      setForm(prev => ({ ...prev, images: [...(prev.images || []), ...newUrls] }));
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
      e.target.value = '';   // reset so the same file can be picked again
    }
  };

  const removeImage = (index) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const inputClass = `w-full border rounded-lg px-3 py-2 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 ${
    isWarmthMode ? 'border-gray-300 focus:ring-purple-400' : 'border-cyan-700 focus:ring-cyan-400'
  }`;

  return (
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
          Tag <span className="text-red-500">*</span>
        </label>
        <select
          required
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          className={inputClass}
        >
          <option value="" disabled>Select a tag...</option>
          {TAG_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">
            Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date" required
            value={form.start}
            onChange={(e) => setForm({ ...form, start: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            End Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date" required
            value={form.end}
            onChange={(e) => setForm({ ...form, end: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Images</label>

        {form.images && form.images.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-2">
            {form.images.map((url, idx) => (
              <div key={url} className="relative group">
                <img
                  src={url}
                  alt={`Event image ${idx + 1}`}
                  className="w-full h-24 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove image"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          disabled={uploading}
          className={inputClass}
        />
        {uploading && <p className="text-xs opacity-70 mt-1">Uploading...</p>}
        {uploadError && <p className="text-red-500 text-xs mt-1">{uploadError}</p>}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving || uploading}
          className={`px-5 py-2 rounded-lg font-medium text-white disabled:opacity-50 ${
            isWarmthMode
              ? 'bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400'
              : 'bg-gradient-to-r from-cyan-500 to-blue-500'
          }`}
        >
          {saving ? 'Saving...' : submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={`px-5 py-2 rounded-lg font-medium ${
            isWarmthMode ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-cyan-900/40 text-cyan-300 hover:bg-cyan-900/60'
          }`}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}