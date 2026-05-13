import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/themeContext';

const Login = () => {
  const { isWarmthMode } = useTheme();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email }),
    })
      .then(response => {
        if (!response.ok) throw new Error('Login request failed');
        setStatus("sent");
      })
      .catch(err => {
        console.error('Login error:', err);
        setErrorMsg("Something went wrong. Please try again.");
        setStatus("error");
      });
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">

      {/* BG (theme-aware) */}
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
                transition={{
                  duration: 15 + Math.random() * 20,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#1a1f4a] to-[#0a0e27]" />
            {Array.from({ length: 2000 }).map((_, i) => (
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
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </>
        )}
      </div>

      <Header />

      <main className="flex-1 relative z-10 flex items-center justify-center px-4">
        <motion.div
          className={`w-full max-w-md p-8 rounded-2xl shadow-xl border transition-colors duration-500
            ${isWarmthMode
              ? "bg-white/30 border-[#e2eafc] text-[#264653]"
              : "bg-[#1b2433]/30 border-cyan-700/50 text-cyan-100"
            }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h1 className={`text-2xl font-semibold mb-2 ${isWarmthMode ? "text-[#E94E41]" : "text-cyan-300"}`}>
            Admin Login
          </h1>
          <p className={`text-sm mb-6 ${isWarmthMode ? "text-[#39536B]" : "text-cyan-400"}`}>
            Enter your email to receive a sign-in link.
          </p>

          {status === "sent" ? (
            <div className={`text-sm ${isWarmthMode ? "text-[#264653]" : "text-cyan-100"}`}>
              <p className="mb-2">Check your inbox.</p>
              <p>If that email is authorized, a sign-in link is on its way.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label
                className={`block text-sm font-medium mb-1 ${isWarmthMode ? "text-[#264653]" : "text-cyan-300"}`}
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "sending"}
                className={`w-full rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 transition-colors duration-300
                  ${isWarmthMode
                    ? "bg-white/60 border border-[#e2eafc] text-[#264653] placeholder-gray-400 focus:ring-[#E94E41]"
                    : "bg-[#1b2433]/50 border border-cyan-700/50 text-cyan-100 placeholder-cyan-700 focus:ring-cyan-500"
                  }`}
                placeholder="you@example.com"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className={`w-full font-medium py-2 rounded-lg transition-opacity disabled:opacity-50
                  ${isWarmthMode
                    ? "bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white hover:opacity-90"
                    : "bg-cyan-700/60 hover:bg-cyan-600/70 text-cyan-100 border border-cyan-600"
                  }`}
              >
                {status === "sending" ? "Sending..." : "Send link"}
              </button>
              {errorMsg && (
                <p className={`text-sm mt-3 ${isWarmthMode ? "text-red-600" : "text-[#F38BA3]"}`}>
                  {errorMsg}
                </p>
              )}
            </form>
          )}

          <div className="mt-6 text-xs">
            <Link
              to="/"
              className={`hover:underline ${isWarmthMode ? "text-[#39536B] hover:text-[#E94E41]" : "text-cyan-500 hover:text-cyan-300"}`}
            >
              ← Back to site
            </Link>
          </div>
        </motion.div>
      </main>

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
};

export default Login;