import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../../hooks/themeContext';
import EventForm from './EventForm';

export default function EditEvent() {
  const { isWarmthMode } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();

  const [initialForm, setInitialForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Event not found');
        return res.json();
      })
      .then(event => {
        setInitialForm({
          title: event.title || '',
          desc: event.desc || '',
          tags: event.tags || '',
          start: event.start || '',
          end: event.end || '',
          images: Array.isArray(event.images) ? event.images : [],
          content_blocks: Array.isArray(event.content_blocks) ? event.content_blocks : [],
          project_id: event.project_id || null,
        });
      })
      .catch(err => setError(err.message));
  }, [id]);

  const handleSubmit = async (form) => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to update event');
      }
      navigate('/Admin/Events');
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  const cardClass = isWarmthMode
    ? 'bg-white/80 border-pink-200 text-gray-800'
    : 'bg-[#0a0e27]/60 border-cyan-500/50 text-white';

  if (error && !initialForm) {
    return (
      <div className={`max-w-2xl mx-auto p-6 rounded-2xl border-2 ${cardClass}`}>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!initialForm) {
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
        Edit Event
      </h1>
      <EventForm
        initialForm={initialForm}
        onSubmit={handleSubmit}
        submitLabel="Save changes"
        onCancel={() => navigate('/Admin/Events')}
        error={error}
        saving={saving}
      />
    </motion.div>
  );
}