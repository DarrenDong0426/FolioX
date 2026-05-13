// Imports
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { useTheme } from '../../hooks/themeContext';

/**
 * Login
 *
 * Admin login page using OTP (one-time password) flow.
 *
 * Pipeline:
 *   1. User enters email → submits.
 *   2. Frontend POSTs email to /api/admin/login.
 *   3. Backend checks email against ADMIN_EMAIL env var:
 *       - If match: generates 6-digit code, stores its hash with 10-min expiration,
 *         emails the code to the admin.
 *       - If no match: silently does nothing.
 *      Either way, returns 200 (prevents enumeration attacks).
 *   4. Frontend switches UI to OTP input field.
 *   5. User checks email, types 6-digit code, submits.
 *   6. Frontend POSTs { email, code } to /api/admin/verify.
 *   7. Backend hashes the code, looks it up:
 *       - If valid + not expired + not used: marks code as used,
 *         creates a session row, sets an HTTP-only session cookie.
 *       - If invalid/expired/used: returns 401.
 *   8. On success, frontend redirects to /Admin, where AdminRoute
 *      checks the session cookie via /api/admin/me and lets the user in.
 */
const Login = () => {
  const { isWarmthMode } = useTheme();

  // Email entered in stage 1
  const [email, setEmail] = useState("");

  // OTP entered in stage 2
  const [code, setCode] = useState("");

  // Two-stage form: "email" shows the email input, "code" shows the OTP input
  const [stage, setStage] = useState("email");

  // Async status for the current request: "idle" | "sending" | "verifying"
  const [status, setStatus] = useState("idle");

  // Error message displayed below the form (cleared on each new submission)
  const [errorMsg, setErrorMsg] = useState("");

  /**
   * Stage 1 → Stage 2 transition.
   * Posts the email to /api/admin/login. Backend always returns 200, so we
   * advance to the code-entry stage regardless of whether the email is valid.
   */
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
      .then(response => {
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

  /**
   * Stage 2 submit.
   * Posts { email, code } to /api/admin/verify. On success (200), the backend
   * has set a session cookie via Set-Cookie; we redirect to /Admin, which
   * goes through AdminRoute → /api/admin/me → renders dashboard.
   */
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
        // Full reload so AdminRoute re-runs its auth check with the fresh cookie
        window.location.href = '/Admin';
      })
      .catch(err => {
        setErrorMsg(err.message);
        setStatus("idle");
      });
  };

  /** Go back to email entry — clears the code and any error. */
  const handleBackToEmail = () => {
    setStage("email");
    setCode("");
    setErrorMsg("");
  };

  return (
    <div className="relative min-h-screen flex flex-col text-gray-900 overflow-hidden">

      {/* =========================
          BG (theme-aware)
      ========================== */}
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