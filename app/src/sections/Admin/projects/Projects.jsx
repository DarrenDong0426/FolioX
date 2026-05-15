import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/themeContext';

export default function AdminProjects() {
  const { isWarmthMode } = useTheme();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch the list of projects on mount
  useEffect(() => {
    fetch('/api/projects')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load projects');
        return res.json();
      })
      .then(data => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Delete failed');
      setProjects(projects.filter(p => p.id !== id));
    } catch (err) {
      alert(`Failed to delete: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  // Theme-aware styles
  const cardClass = isWarmthMode
    ? 'bg-white/80 border-pink-200 text-gray-800'
    : 'bg-[#0a0e27]/60 border-cyan-500/50 text-white';

  const tableHeaderClass = isWarmthMode
    ? 'text-pink-700 border-b-2 border-pink-200'
    : 'text-cyan-300 border-b-2 border-cyan-500/40';

  const rowHoverClass = isWarmthMode
    ? 'hover:bg-pink-50'
    : 'hover:bg-cyan-900/20';

  const addButtonClass = isWarmthMode
    ? 'bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white hover:opacity-90'
    : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90';

  const editButtonClass = isWarmthMode
    ? 'text-pink-600 hover:bg-pink-100'
    : 'text-cyan-400 hover:bg-cyan-900/40';

  const deleteButtonClass = isWarmthMode
    ? 'text-red-600 hover:bg-red-100'
    : 'text-red-400 hover:bg-red-900/30';

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div
          className={`w-12 h-12 rounded-full border-4 border-t-transparent animate-spin
            ${isWarmthMode ? "border-[#E94E41]" : "border-cyan-400"}
          `}
        />
        <p className={`font-mono tracking-widest uppercase text-sm
          ${isWarmthMode ? "text-[#8B2D2D]" : "text-cyan-200"}
        `}>
          Loading projects...
        </p>
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
        <h1 className={`text-3xl font-bold ${
          isWarmthMode ? 'text-pink-700' : 'text-cyan-300'
        }`}>
          Projects ({projects.length})
        </h1>
        <Link
          to="/Admin/Projects/New"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${addButtonClass}`}
        >
          + New project
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-center py-10 opacity-70">
          No projects yet. Click "+ New project" to create one.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={`text-left ${tableHeaderClass}`}>
                <th className="py-3 px-2">Name</th>
                <th className="py-3 px-2">Date</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2">Languages</th>
                <th className="py-3 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(p => (
                <tr
                  key={p.id}
                  className={`border-b ${
                    isWarmthMode ? 'border-pink-100' : 'border-cyan-900/30'
                  } ${rowHoverClass} transition-colors`}
                >
                  <td className="py-3 px-2 font-medium">{p.name}</td>
                  <td className="py-3 px-2 opacity-80">{p.month_year}</td>
                  <td className="py-3 px-2">
                    <div className="flex gap-2">
                      {p.lock && (
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          isWarmthMode ? 'bg-red-100 text-red-700' : 'bg-red-900/40 text-red-300'
                        }`}>🔒 Locked</span>
                      )}
                      {p.wip && (
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          isWarmthMode ? 'bg-yellow-100 text-yellow-700' : 'bg-yellow-900/40 text-yellow-300'
                        }`}>WIP</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-2 opacity-80">
                    {Array.isArray(p.language) ? p.language.join(', ') : ''}
                  </td>
                  <td className="py-3 px-2 text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => navigate(`/Admin/Projects/${p.id}/Edit`)}
                        className={`px-3 py-1 rounded text-xs font-medium ${editButtonClass}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        disabled={deletingId === p.id}
                        className={`px-3 py-1 rounded text-xs font-medium disabled:opacity-50 ${deleteButtonClass}`}
                      >
                        {deletingId === p.id ? '...' : 'Delete'}
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