import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/themeContext";

export default function NotFound() {
  const { isWarmthMode } = useTheme();

  return (
    <div
      className={`
      min-h-screen flex flex-col items-center justify-center px-6
      ${
        isWarmthMode
          ? "bg-gradient-to-tr from-pink-300 via-purple-300 to-blue-300"
          : "bg-gradient-to-br from-[#0a0e27] via-[#1a1f4a] to-[#0a0e27]"
      }
    `}
    >
      <h1
        className={`
        text-7xl font-bold mb-4
        ${isWarmthMode ? "text-[#E94E41]" : "text-cyan-300"}
      `}
      >
        404
      </h1>
      <p
        className={`
        text-xl mb-8
        ${isWarmthMode ? "text-[#264653]" : "text-cyan-200"}
      `}
      >
        Page not found.
      </p>
      <Link
        to="/"
        className={`
          px-6 py-2 rounded-lg font-medium border-2 transition-colors
          ${
            isWarmthMode
              ? "bg-white border-[#E94E41] text-[#E94E41] hover:bg-[#E94E41] hover:text-white"
              : "bg-[#151C26] border-cyan-500 text-cyan-300 hover:bg-cyan-500 hover:text-[#151C26]"
          }
        `}
      >
        ← Back to home
      </Link>
    </div>
  );
}
