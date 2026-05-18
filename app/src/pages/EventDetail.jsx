import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlockRenderer from '../components/BlockRenderer';
import { useTheme } from '../hooks/themeContext';

export default function EventDetail() {
  const { id } = useParams();
  const { isWarmthMode } = useTheme();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Event not found');
        return res.json();
      })
      .then(data => {
        // If this event is linked to a project, redirect to the project page
        if (data.project_id) {
          navigate(`/Projects/${data.project_id}`, { replace: true });
          return;
        }
        setEvent(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id, navigate]);

  const Background = useMemo(() => (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {isWarmthMode ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-300 via-purple-300 to-blue-300 animate-gradient bg-[length:400%_400%]" />
          {Array.from({ length: 75 }).map((_, i) => (
            <motion.div
              key={`light-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${50 + Math.random() * 100}px`,
                height: `${50 + Math.random() * 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
                opacity: 0.5 + Math.random() * 0.3,
              }}
              animate={{
                x: [0, Math.random() * 200 - 100, 0],
                y: [0, Math.random() * 100 - 50, 0],
                scale: [1, 0.8 + Math.random() * 0.4, 1],
              }}
              transition={{ duration: 15 + Math.random() * 20, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#1a1f4a] to-[#0a0e27]" />
          {Array.from({ length: 75 }).map((_, i) => (
            <motion.div
              key={`dark-${i}`}
              className="absolute rounded-full bg-cyan-300"
              style={{
                width: `${1 + Math.random() * 3}px`,
                height: `${1 + Math.random() * 3}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.3 + Math.random() * 0.7,
                boxShadow: '0 0 4px rgba(125, 227, 252, 0.8)',
              }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
              transition={{ duration: 2 + Math.random() * 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 3 }}
            />
          ))}
        </>
      )}
    </div>
  ), [isWarmthMode]);

  const cardClass = isWarmthMode
    ? 'bg-white/80 border-[#E94E41] text-gray-800'
    : 'bg-[#181b22]/90 border-cyan-500 text-cyan-100';

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {Background}
      <Header />

      <main className="flex-1 px-6 py-8 relative z-10 max-w-4xl w-full mx-auto">
        <Link
          to="/Timeline"
          className={`inline-block mb-4 text-sm hover:underline ${
            isWarmthMode ? 'text-[#E94E41]' : 'text-cyan-400'
          }`}
        >
          ← Back to timeline
        </Link>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className={`w-12 h-12 rounded-full border-4 border-t-transparent animate-spin
              ${isWarmthMode ? "border-[#E94E41]" : "border-cyan-400"}`} />
            <p className={`font-mono tracking-widest uppercase text-sm
              ${isWarmthMode ? "text-[#8B2D2D]" : "text-cyan-200"}`}>Loading...</p>
          </div>
        ) : error ? (
          <div className={`p-6 rounded-2xl border-2 ${cardClass}`}>
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`p-8 rounded-2xl backdrop-blur-md border-2 shadow-2xl ${cardClass}`}
          >
            <h1 className={`text-4xl font-bold mb-2 ${
              isWarmthMode ? 'text-[#264653]' : 'text-cyan-200'
            }`}>
              {event.title}
            </h1>

            <p className={`text-sm mb-4 ${
              isWarmthMode ? 'text-gray-500' : 'text-cyan-400'
            }`}>
              {event.start} — {event.end}
              {event.tags && <> · {event.tags}</>}
            </p>

            <p className={`mb-6 ${
              isWarmthMode ? 'text-gray-700' : 'text-cyan-100'
            }`}>
              {event.desc}
            </p>

            {event.images && event.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                {event.images.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`${event.title} image ${idx + 1}`}
                    className="w-full h-32 object-cover rounded border"
                  />
                ))}
              </div>
            )}

            <hr className={`my-6 ${
              isWarmthMode ? 'border-pink-200' : 'border-cyan-900'
            }`} />

            <BlockRenderer blocks={event.content_blocks} />
          </motion.article>
        )}
      </main>

      <Footer />

      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradientShift 40s ease infinite;
        }
      `}</style>
    </div>
  );
}