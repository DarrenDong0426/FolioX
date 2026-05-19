// src/ThemeContext.js
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isWarmthMode, setIsWarmthMode] = useState(() => {
    try {
      const saved = localStorage.getItem("warmthMode");
      return saved !== null ? saved === "true" : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("warmthMode", String(isWarmthMode));
    } catch {
      // localStorage unavailable (private mode, etc.) — fail silently
    }
  }, [isWarmthMode]);

  return (
    <ThemeContext.Provider value={{ isWarmthMode, setIsWarmthMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
