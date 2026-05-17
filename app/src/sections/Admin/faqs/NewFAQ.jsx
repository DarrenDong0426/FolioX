import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/themeContext';

export default function NewFAQ() {
  const { isWarmthMode } = useTheme();
  const navigate = useNavigate();

  const [form, setForm] = useState({ question: '', answer: '', sort_order: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        question: form.question,
        answer: form.answer,
        sort_order: form.sort_order ? parseInt(form.sort_order, 10) : null,
      };
      const res = await fetch('/api/admin/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to create FAQ');
      }
      navigate('/Admin/FAQs');
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
        New FAQ
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Question <span className="text-red-500">*</span>
          </label>
          <input
            type="text" required maxLength={500}
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Answer <span className="text-red-500">*</span>
          </label>
          <textarea
            required rows={6}
            value={form.answer}
            onChange={(e) => setForm({ ...form, answer: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sort Order</label>
          <input
            type="number"
            placeholder="Leave blank to append at the end"
            value={form.sort_order}
            onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
            className={inputClass}
          />
          <p className="text-xs opacity-60 mt-1">
            Lower numbers appear first. Use values like 10, 20, 30 so you can insert in between later.
          </p>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit" disabled={saving}
            className={`px-5 py-2 rounded-lg font-medium text-white disabled:opacity-50 ${
              isWarmthMode
                ? 'bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400'
                : 'bg-gradient-to-r from-cyan-500 to-blue-500'
            }`}
          >
            {saving ? 'Saving...' : 'Create FAQ'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/Admin/FAQs')}
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