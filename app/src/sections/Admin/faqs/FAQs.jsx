import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/themeContext';

export default function AdminFAQs() {
  const { isWarmthMode } = useTheme();
  const navigate = useNavigate();

  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetch('/api/faqs')
      .then(res => res.json())
      .then(data => {
        setFaqs(data.faqs || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id, question) => {
    if (!window.confirm(`Delete this FAQ?\n\n"${question}"`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/faqs/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Delete failed');
      setFaqs(faqs.filter(f => f.id !== id));
    } catch (err) {
      alert(`Failed to delete: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  const cardClass = isWarmthMode
    ? 'bg-white/80 border-pink-200 text-gray-800'
    : 'bg-[#0a0e27]/60 border-cyan-500/50 text-white';

  const tableHeaderClass = isWarmthMode
    ? 'text-pink-700 border-b-2 border-pink-200'
    : 'text-cyan-300 border-b-2 border-cyan-500/40';

  const rowHoverClass = isWarmthMode ? 'hover:bg-pink-50' : 'hover:bg-cyan-900/20';
  const addButtonClass = isWarmthMode
    ? 'bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white hover:opacity-90'
    : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90';
  const editButtonClass = isWarmthMode ? 'text-pink-600 hover:bg-pink-100' : 'text-cyan-400 hover:bg-cyan-900/40';
  const deleteButtonClass = isWarmthMode ? 'text-red-600 hover:bg-red-100' : 'text-red-400 hover:bg-red-900/30';

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className={`w-12 h-12 rounded-full border-4 border-t-transparent animate-spin
          ${isWarmthMode ? "border-[#E94E41]" : "border-cyan-400"}`} />
        <p className={`font-mono tracking-widest uppercase text-sm
          ${isWarmthMode ? "text-[#8B2D2D]" : "text-cyan-200"}`}>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`max-w-5xl mx-auto p-6 rounded-2xl border-2 ${cardClass}`}>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`max-w-6xl mx-auto p-6 rounded-2xl backdrop-blur-md border-2 shadow-2xl ${cardClass}`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-3xl font-bold ${isWarmthMode ? 'text-pink-700' : 'text-cyan-300'}`}>
          FAQs ({faqs.length})
        </h1>
        <Link
          to="/Admin/FAQs/New"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${addButtonClass}`}
        >
          + New FAQ
        </Link>
      </div>

      {faqs.length === 0 ? (
        <p className="text-center py-10 opacity-70">No FAQs yet. Click "+ New FAQ" to add one.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={tableHeaderClass}>
                <th className="py-3 px-2 text-center">Order</th>
                <th className="py-3 px-2 text-center">Question</th>
                <th className="py-3 px-2 text-center">Answer</th>
                <th className="py-3 px-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {faqs.map(f => (
                <tr key={f.id} className={`border-b ${
                  isWarmthMode ? 'border-pink-100' : 'border-cyan-900/30'
                } ${rowHoverClass} transition-colors`}>
                  <td className="py-3 px-2 text-center opacity-60">{f.sort_order}</td>
                  <td className="py-3 px-2 font-medium text-center max-w-sm">
                    <p className="truncate" title={f.question}>{f.question}</p>
                  </td>
                  <td className="py-3 px-2 opacity-80 text-center max-w-md">
                    <p className="truncate" title={f.answer}>{f.answer}</p>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <div className="flex justify-center gap-1">
                      <button
                        onClick={() => navigate(`/Admin/FAQs/${f.id}/Edit`)}
                        className={`px-3 py-1 rounded text-xs font-medium ${editButtonClass}`}
                      >Edit</button>
                      <button
                        onClick={() => handleDelete(f.id, f.question)}
                        disabled={deletingId === f.id}
                        className={`px-3 py-1 rounded text-xs font-medium disabled:opacity-50 ${deleteButtonClass}`}
                      >
                        {deletingId === f.id ? '...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}