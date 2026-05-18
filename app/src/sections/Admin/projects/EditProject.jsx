import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../../hooks/themeContext';
import TagSelector from './TagSelector';
import BlockEditor from '../../../components/BlockEditor';
import BlockRenderer from '../../../components/BlockRenderer';
const LANGUAGE_BASE_PRESETS = ['C', 'C++', 'Java', 'Python', 'JavaScript', 'HTML', 'CSS', 'Dart', 'Shell'];
const TYPE_BASE_PRESETS = ['AI/ML', 'Hardware', 'Software'];

function deriveTagPresets(projects, field, basePresets) {
  const seen = new Set(basePresets);
  for (const p of projects) {
    if (Array.isArray(p[field])) {
      for (const tag of p[field]) {
        if (tag) seen.add(tag);
      }
    }
  }
  return Array.from(seen).sort();
}

export default function EditProject() {
  const { isWarmthMode } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        const all = data.projects || [];
        setAllProjects(all);
        const project = all.find(p => String(p.id) === id);
        if (!project) {
          setError('Project not found');
          return;
        }
        setForm({
          name: project.name || '',
          desc: project.desc || '',
          month_year: project.month_year_raw || '',
          language: Array.isArray(project.language) ? project.language : [],
          type: Array.isArray(project.type) ? project.type : [],
          lock: !!project.lock,
          wip: !!project.wip,
          featured: !!project.featured, 
          content_blocks: Array.isArray(project.content_blocks) ? project.content_blocks : [],  // NEW
        });
      })
      .catch(err => setError(err.message));
  }, [id]);

  const languagePresets = deriveTagPresets(allProjects, 'language', LANGUAGE_BASE_PRESETS);
  const typePresets = deriveTagPresets(allProjects, 'type', TYPE_BASE_PRESETS);

  const handleDeletePreset = async (field, tag) => {
    try {
      const res = await fetch('/api/admin/projects/tags', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ field, tag }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to delete tag');
      }
      const refreshed = await fetch('/api/projects').then(r => r.json());
      setAllProjects(refreshed.projects || []);
      setForm(f => f ? {
        ...f,
        language: field === 'language' ? f.language.filter(t => t !== tag) : f.language,
        type: field === 'type' ? f.type.filter(t => t !== tag) : f.type,
      } : f);
    } catch (err) {
      alert(`Failed to delete tag: ${err.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to update project');
      }
      navigate('/Admin/Projects');
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  const cardClass = isWarmthMode
    ? 'bg-white/80 border-pink-200 text-gray-800'
    : 'bg-[#0a0e27]/60 border-cyan-500/50 text-white';

  const inputClass = `w-full border rounded-lg px-3 py-2 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 ${
    isWarmthMode
      ? 'border-gray-300 focus:ring-purple-400'
      : 'border-cyan-700 focus:ring-cyan-400'
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
          ${isWarmthMode ? "text-[#8B2D2D]" : "text-cyan-200"}`}>
          Loading...
        </p>
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
      <h1 className={`text-3xl font-bold mb-6 ${
        isWarmthMode ? 'text-pink-700' : 'text-cyan-300'
      }`}>
        Edit Project
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            maxLength={100}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            rows={4}
            maxLength={5000}
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            required
            value={form.month_year}
            onChange={(e) => setForm({ ...form, month_year: e.target.value })}
            className={inputClass}
          />
        </div>

        <TagSelector
          label="Languages"
          presets={languagePresets}
          selected={form.language}
          onChange={(newLangs) => setForm({ ...form, language: newLangs })}
          onDeletePreset={(tag) => handleDeletePreset('language', tag)}
          required
        />

        <TagSelector
          label="Types"
          presets={typePresets}
          selected={form.type}
          onChange={(newTypes) => setForm({ ...form, type: newTypes })}
          onDeletePreset={(tag) => handleDeletePreset('type', tag)}
          required
        />

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.lock}
              onChange={(e) => setForm({ ...form, lock: e.target.checked })}
            />
            Locked (private project)
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.wip}
              onChange={(e) => setForm({ ...form, wip: e.target.checked })}
            />
            Work in progress
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            ⭐ Featured (homepage carousel)
          </label>
          
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">Page Content</label>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className={`px-3 py-1 rounded text-xs font-medium ${
                isWarmthMode
                  ? 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                  : 'bg-cyan-900/40 text-cyan-300 hover:bg-cyan-900/60'
              }`}
            >
              {showPreview ? '✎ Edit' : '👁 Preview'}
            </button>
          </div>

          {showPreview ? (
            <div className={`p-4 rounded-lg border ${
              isWarmthMode ? 'bg-white border-pink-200' : 'bg-[#0a0e27]/60 border-cyan-700'
            }`}>
              <BlockRenderer blocks={form.content_blocks} />
            </div>
          ) : (
            <BlockEditor
              blocks={form.content_blocks}
              onChange={(newBlocks) => setForm({ ...form, content_blocks: newBlocks })}
            />
          )}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
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
            onClick={() => navigate('/Admin/Projects')}
            className={`px-5 py-2 rounded-lg font-medium ${
              isWarmthMode
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-cyan-900/40 text-cyan-300 hover:bg-cyan-900/60'
            }`}
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
}