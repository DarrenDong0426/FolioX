// src/ThemeContext.js
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isWarmthMode, setIsWarmthMode] = useState(true);
  return (
    <ThemeContext.Provider value={{ isWarmthMode, setIsWarmthMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
