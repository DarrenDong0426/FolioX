import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/themeContext';
import EventForm from './EventForm';

export default function NewEvent() {
  const { isWarmthMode } = useTheme();
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const initialForm = {
    title: '',
    desc: '',
    tags: '',
    start: '',
    end: '',
    images: [],
    content_blocks: [],
    project_id: null,
  };

  const handleSubmit = async (form) => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to create event');
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`max-w-2xl mx-auto p-8 rounded-2xl backdrop-blur-md border-2 shadow-2xl ${cardClass}`}
    >
      <h1 className={`text-3xl font-bold mb-6 ${isWarmthMode ? 'text-pink-700' : 'text-cyan-300'}`}>
        New Event
      </h1>
      <EventForm
        initialForm={initialForm}
        onSubmit={handleSubmit}
        submitLabel="Create event"
        onCancel={() => navigate('/Admin/Events')}
        error={error}
        saving={saving}
      />
    </motion.div>
  );
}