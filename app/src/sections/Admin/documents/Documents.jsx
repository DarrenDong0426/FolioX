import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/themeContext';

export default function AdminDocuments() {
  const { isWarmthMode } = useTheme();
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetch('/api/documents')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load documents');
        return res.json();
      })
      .then(data => {
        setDocuments(data.documents || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This also removes the file from storage and cannot be undone.`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/documents/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Delete failed');
      setDocuments(documents.filter(d => d.id !== id));
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
          ${isWarmthMode ? "text-[#8B2D2D]" : "text-cyan-200"}`}>Loading documents...</p>
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
          Documents ({documents.length})
        </h1>
        <Link
          to="/Admin/Documents/New"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${addButtonClass}`}
        >
          + New document
        </Link>
      </div>

      {documents.length === 0 ? (
        <p className="text-center py-10 opacity-70">
          No documents yet. Click "+ New document" to upload one.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={`text-left ${tableHeaderClass}`}>
                <th className="py-3 px-2 text-center">Title</th>
                <th className="py-3 px-2 text-center">Description</th>
                <th className="py-3 px-2 text-center">Last Updated</th>
                <th className="py-3 px-2 text-center">File</th>
                <th className="py-3 px-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
            {documents.map(d => (
            <tr key={d.id} className={`border-b ${
              isWarmthMode ? 'border-pink-100' : 'border-cyan-900/30'
            } ${rowHoverClass} transition-colors`}>

              <td className="py-3 px-2 font-medium text-center">{d.title}</td>

              <td className="py-3 px-2 opacity-80 max-w-md text-center">
                {d.desc ? (
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(d.desc);
                      setCopiedId(d.id);
                      setTimeout(() => setCopiedId(null), 1500);
                    }}
                    className="truncate block w-full hover:opacity-100 cursor-pointer"
                    title={`${d.desc}\n\n(Click to copy)`}
                  >
                    {copiedId === d.id ? <span className="text-green-600">✓ Copied!</span> : d.desc}
                  </button>
                ) : (
                  <span className="opacity-50 italic">No description</span>
                )}
              </td>

              <td className="py-3 px-2 opacity-80 text-center">{d.month_year}</td>

              <td className="py-3 px-2 opacity-80 text-center">
                <a href={d.file_path} target="_blank" rel="noreferrer" className="underline hover:opacity-100">
                  View
                </a>
              </td>

              <td className="py-3 px-2 text-center">
                <div className="flex justify-center gap-1">
                  <button
                    onClick={() => navigate(`/Admin/Documents/${d.id}/Edit`)}
                    className={`px-3 py-1 rounded text-xs font-medium ${editButtonClass}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(d.id, d.title)}
                    disabled={deletingId === d.id}
                    className={`px-3 py-1 rounded text-xs font-medium disabled:opacity-50 ${deleteButtonClass}`}
                  >
                    {deletingId === d.id ? '...' : 'Delete'}
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