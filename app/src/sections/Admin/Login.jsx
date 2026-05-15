import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/themeContext';

const Login = () => {
  const { isWarmthMode } = useTheme();
  const navigate = useNavigate();

  // State Management
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [stage, setStage] = useState("email");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);

  // On mount: check if already authed. If yes, redirect to /Admin instantly.
  useEffect(() => {
    fetch('/api/admin/me', { credentials: 'include' })
      .then(response => {
        if (response.ok) {
          navigate('/Admin', { replace: true });   // instant in-app redirect
        } else {
          setCheckingAuth(false);                  // not authed, show login form
        }
      })
      .catch(() => {
        setCheckingAuth(false);                    // network error, show login form
      });
  }, [navigate]);

  const Background = useMemo(() => {
    return (
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
            {Array.from({ length: 100 }).map((_, i) => (
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
    );
  }, [isWarmthMode]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email }),
    })
      .then(async response => {
        if (response.status === 429) {
          const data = await response.json().catch(() => ({}));
          setErrorMsg(`Too many requests. Try again in a few minutes.`);
          setStatus("idle");
          return;
        }
        if (!response.ok) throw new Error('Login request failed');
        setStage("code");
        setStatus("idle");
      })
      .catch(err => {
        console.error('Login error:', err);
        setErrorMsg("Something went wrong. Please try again.");
        setStatus("idle");
      });
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    setStatus("verifying");
    setErrorMsg("");

    fetch('/api/admin/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, code }),
    })
      .then(async response => {
        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error || 'Invalid code');
        }
        navigate('/Admin', { replace: true });   // instant in-app redirect
      })
      .catch(err => {
        setErrorMsg(err.message);
        setStatus("idle");
      });
  };

  const handleBackToEmail = () => {
    setStage("email");
    setCode("");
    setErrorMsg("");
  };

  // Blank screen while auth check runs — prevents form flicker before redirect
  if (checkingAuth) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {Background}
      <div
        className={`relative z-10 w-12 h-12 rounded-full border-4 border-t-transparent animate-spin
          ${isWarmthMode ? "border-[#E94E41]" : "border-cyan-400"}
        `}
      />
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

  return (
    <div className="relative min-h-screen flex flex-col text-gray-900 overflow-hidden">
      {Background}
      <Header />
      <main className="flex-1 relative z-10 flex items-center justify-center px-4">
        <motion.div
          className="w-full max-w-md bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h1 className="text-2xl font-semibold mb-2">Admin Login</h1>
          <p className="text-sm text-gray-600 mb-6">
            {stage === "email"
              ? "Enter your email to receive a 6-digit code."
              : "Check your inbox for a 6-digit code."}
          </p>

          {stage === "email" ? (
            <form onSubmit={handleEmailSubmit}>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "sending"}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 bg-white/90 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="you@example.com"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white font-medium py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {status === "sending" ? "Sending..." : "Send code"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleCodeSubmit}>
              <label className="block text-sm font-medium mb-1" htmlFor="code">
                Code
              </label>
              <input
                id="code"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                required
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                disabled={status === "verifying"}
                autoFocus
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 bg-white/90 focus:outline-none focus:ring-2 focus:ring-purple-400 text-center text-2xl tracking-widest font-mono"
                placeholder="000000"
              />
              <button
                type="submit"
                disabled={status === "verifying" || code.length !== 6}
                className="w-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white font-medium py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {status === "verifying" ? "Verifying..." : "Verify"}
              </button>
              <button
                type="button"
                onClick={handleBackToEmail}
                className="w-full mt-3 text-xs text-gray-500 hover:underline"
              >
                ← Use a different email
              </button>
            </form>
          )}

          {errorMsg && (
            <p className="text-sm text-red-600 mt-3">{errorMsg}</p>
          )}

          <div className="mt-6 text-xs text-gray-500">
            <Link to="/" className="hover:underline">← Back to site</Link>
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